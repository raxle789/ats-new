/*
  Warnings:

  - You are about to drop the column `current_salary` on the `candidates` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[candidates] DROP COLUMN [current_salary];
ALTER TABLE [dbo].[candidates] ADD [expected_salary] INT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
