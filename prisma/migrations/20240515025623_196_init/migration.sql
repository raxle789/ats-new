BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[candidate_state_assessments] (
    [id] INT NOT NULL IDENTITY(1,1),
    [remote_id] INT NOT NULL,
    [gti] NVARCHAR(510),
    [disc] NVARCHAR(510),
    [final_result] NVARCHAR(510) NOT NULL,
    [candidate_state_id] INT NOT NULL,
    [started_at] DATETIME,
    [finished_at] DATETIME,
    [created_at] DATETIME CONSTRAINT [candidate_state_assessments_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [candidate_state_assessments_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[candidate_state_assessments] ADD CONSTRAINT [candidate_state_assessments_candidate_state_id_fkey] FOREIGN KEY ([candidate_state_id]) REFERENCES [dbo].[candidate_states]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
