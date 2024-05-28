/*
  Warnings:

  - The primary key for the `interview_interviewers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `interviewer_nik` on the `interview_interviewers` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `NVarChar(510)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[interview_interviewers] DROP CONSTRAINT [interview_interviewers_pkey];
ALTER TABLE [dbo].[interview_interviewers] ALTER COLUMN [interviewer_nik] NVARCHAR(510) NOT NULL;
ALTER TABLE [dbo].[interview_interviewers] ADD CONSTRAINT interview_interviewers_pkey PRIMARY KEY CLUSTERED ([interview_id],[interviewer_nik]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
