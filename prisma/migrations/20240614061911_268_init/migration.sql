BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[employment_status] ADD [is_show] BIT CONSTRAINT [employment_status_is_show_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
