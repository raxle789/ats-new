BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[states] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(255) NOT NULL,
    [created_at] DATETIME CONSTRAINT [states_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [states_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[candidate_states] (
    [candidate_id] INT NOT NULL,
    [job_vacancy_id] INT NOT NULL,
    [state_id] INT NOT NULL,
    [assigned_at] DATETIME NOT NULL CONSTRAINT [candidate_states_assigned_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [candidate_states_pkey] PRIMARY KEY CLUSTERED ([candidate_id],[job_vacancy_id],[state_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[candidate_states] ADD CONSTRAINT [candidate_states_candidate_id_fkey] FOREIGN KEY ([candidate_id]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[candidate_states] ADD CONSTRAINT [candidate_states_job_vacancy_id_fkey] FOREIGN KEY ([job_vacancy_id]) REFERENCES [dbo].[job_vacancies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[candidate_states] ADD CONSTRAINT [candidate_states_state_id_fkey] FOREIGN KEY ([state_id]) REFERENCES [dbo].[states]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
