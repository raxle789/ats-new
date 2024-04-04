/*
  Warnings:

  - Made the column `date_of_birth` on table `candidates` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[documents] DROP CONSTRAINT [documents_candidate_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[candidates] ALTER COLUMN [date_of_birth] DATE NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[documents] ALTER COLUMN [candidate_id] DECIMAL NULL;

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
