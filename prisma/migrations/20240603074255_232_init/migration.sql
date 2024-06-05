BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [candidates_sourceId_fkey];

-- AlterTable
ALTER TABLE [dbo].[candidates] ALTER COLUMN [sourceId] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[candidates] ADD CONSTRAINT [candidates_sourceId_fkey] FOREIGN KEY ([sourceId]) REFERENCES [dbo].[sources]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
