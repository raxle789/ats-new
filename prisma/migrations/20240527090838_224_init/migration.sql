BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [UQ_e9aae9c8df7ce4bc2e356b57219];

-- AlterTable
ALTER TABLE [dbo].[candidate_state_interviews] ADD [is_email_sent] BIT CONSTRAINT [candidate_state_interviews_is_email_sent_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[candidates] ALTER COLUMN [blood_type] CHAR(2) NULL;

-- AlterTable
ALTER TABLE [dbo].[interview_interviewers] ADD [is_email_sent] BIT CONSTRAINT [interview_interviewers_is_email_sent_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
