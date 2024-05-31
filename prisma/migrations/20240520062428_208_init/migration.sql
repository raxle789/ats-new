BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[types] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [created_at] DATETIME CONSTRAINT [types_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [types_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[email_templates] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [message] TEXT NOT NULL,
    [created_at] DATETIME CONSTRAINT [email_templates_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [email_templates_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[places] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [address] TEXT NOT NULL,
    [created_at] DATETIME CONSTRAINT [places_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [places_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[interviews] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(510) NOT NULL,
    [date] DATETIME NOT NULL,
    [meeting_link] TEXT,
    [type_id] INT NOT NULL,
    [interviewer_id] INT NOT NULL,
    [message_template_id] INT NOT NULL,
    [place_id] INT,
    [interview_result_id] INT,
    CONSTRAINT [interviews_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[candidate_state_interviews] (
    [id] INT NOT NULL IDENTITY(1,1),
    [candidate_state_id] INT NOT NULL,
    [interview_id] INT NOT NULL,
    [created_at] DATETIME CONSTRAINT [candidate_state_interviews_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [candidate_state_interviews_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[interviews] ADD CONSTRAINT [interviews_type_id_fkey] FOREIGN KEY ([type_id]) REFERENCES [dbo].[types]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[interviews] ADD CONSTRAINT [interviews_interviewer_id_fkey] FOREIGN KEY ([interviewer_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[interviews] ADD CONSTRAINT [interviews_message_template_id_fkey] FOREIGN KEY ([message_template_id]) REFERENCES [dbo].[email_templates]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[interviews] ADD CONSTRAINT [interviews_place_id_fkey] FOREIGN KEY ([place_id]) REFERENCES [dbo].[places]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[candidate_state_interviews] ADD CONSTRAINT [candidate_state_interviews_candidate_state_id_fkey] FOREIGN KEY ([candidate_state_id]) REFERENCES [dbo].[candidate_states]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[candidate_state_interviews] ADD CONSTRAINT [candidate_state_interviews_interview_id_fkey] FOREIGN KEY ([interview_id]) REFERENCES [dbo].[interviews]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
