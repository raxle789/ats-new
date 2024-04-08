/*
  Warnings:

  - Added the required column `level` to the `educations` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[documents] ALTER COLUMN [file_base] IMAGE NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[educations] ADD [level] NVARCHAR(32) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
