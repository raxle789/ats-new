/*
  Warnings:

  - You are about to drop the column `userReschedulerNik` on the `interview_results` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[interview_results] DROP COLUMN [userReschedulerNik];
ALTER TABLE [dbo].[interview_results] ADD [userReschedulerNIK] NVARCHAR(510);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
