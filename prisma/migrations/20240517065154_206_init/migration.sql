BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[candidate_state_assessments] DROP CONSTRAINT [candidate_state_assessments_remote_id_key];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
