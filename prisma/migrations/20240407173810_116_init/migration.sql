BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[questions] (
    [id] INT NOT NULL IDENTITY(1,1),
    [question] TEXT NOT NULL,
    [created_at] DATETIME CONSTRAINT [questions_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [questions_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[candidate_questions] (
    [candidate_id] INT NOT NULL,
    [question_id] INT NOT NULL,
    [answer] TEXT NOT NULL,
    [created_at] DATETIME CONSTRAINT [candidate_questions_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [candidate_questions_pkey] PRIMARY KEY CLUSTERED ([candidate_id],[question_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[candidate_questions] ADD CONSTRAINT [candidate_questions_candidate_id_fkey] FOREIGN KEY ([candidate_id]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[candidate_questions] ADD CONSTRAINT [candidate_questions_question_id_fkey] FOREIGN KEY ([question_id]) REFERENCES [dbo].[questions]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
