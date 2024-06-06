/*
  Warnings:

  - You are about to drop the column `statusId` on the `interview_results` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `interview_result_status` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `statusName` to the `interview_results` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[interview_results] DROP CONSTRAINT [interview_results_statusId_fkey];

-- AlterTable
ALTER TABLE [dbo].[interview_results] DROP COLUMN [statusId];
ALTER TABLE [dbo].[interview_results] ADD [statusName] NVARCHAR(510) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[interview_result_status] ADD CONSTRAINT [interview_result_status_name_key] UNIQUE NONCLUSTERED ([name]);

-- AddForeignKey
ALTER TABLE [dbo].[interview_results] ADD CONSTRAINT [interview_results_statusName_fkey] FOREIGN KEY ([statusName]) REFERENCES [dbo].[interview_result_status]([name]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
