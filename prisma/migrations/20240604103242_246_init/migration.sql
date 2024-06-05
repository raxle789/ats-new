/*
  Warnings:

  - You are about to drop the `interview_status` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[interview_results] DROP CONSTRAINT [interview_results_statusId_fkey];

-- DropTable
DROP TABLE [dbo].[interview_status];

-- CreateTable
CREATE TABLE [dbo].[interview_result_status] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [created_at] DATETIME CONSTRAINT [interview_result_status_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [interview_result_status_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[interview_results] ADD CONSTRAINT [interview_results_statusId_fkey] FOREIGN KEY ([statusId]) REFERENCES [dbo].[interview_result_status]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
