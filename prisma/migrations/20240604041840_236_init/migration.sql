/*
  Warnings:

  - The primary key for the `interview_interviewers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `interview_interviewers` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[interview_interviewers] DROP CONSTRAINT [interview_interviewers_pkey];
ALTER TABLE [dbo].[interview_interviewers] ADD [id] INT NOT NULL IDENTITY(1,1);
ALTER TABLE [dbo].[interview_interviewers] ADD CONSTRAINT interview_interviewers_pkey PRIMARY KEY CLUSTERED ([id]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
