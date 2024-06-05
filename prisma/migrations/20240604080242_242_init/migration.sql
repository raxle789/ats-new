BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[interview_interviewers] DROP CONSTRAINT [interview_interviewers_interview_result_id_key];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
