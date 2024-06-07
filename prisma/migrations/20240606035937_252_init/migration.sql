/*
  Warnings:

  - You are about to drop the column `comment` on the `interview_results` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[interview_results] DROP COLUMN [comment];
ALTER TABLE [dbo].[interview_results] ADD [reason] TEXT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
