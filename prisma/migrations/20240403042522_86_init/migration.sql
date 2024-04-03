BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[candidates] ADD [date_of_birth] DATETIME;

-- AlterTable
ALTER TABLE [dbo].[documents] ADD [candidate_id] DECIMAL;

-- AlterTable
ALTER TABLE [dbo].[working_experiences] ADD [job_level] NVARCHAR(64);

-- AddForeignKey
ALTER TABLE [dbo].[documents] ADD CONSTRAINT [documents_candidate_id_fkey] FOREIGN KEY ([candidate_id]) REFERENCES [dbo].[candidates]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
