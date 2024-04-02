/*
  Warnings:

  - You are about to alter the column `updated_at` on the `education_levels` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `DateTime`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[education_levels] ALTER COLUMN [updated_at] DATETIME NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
