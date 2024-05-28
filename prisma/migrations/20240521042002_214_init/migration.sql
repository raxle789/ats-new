/*
  Warnings:

  - The primary key for the `interview_interviewers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `interviewer_id` on the `interview_interviewers` table. All the data in the column will be lost.
  - Added the required column `interviewer_nik` to the `interview_interviewers` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[interview_interviewers] DROP CONSTRAINT [interview_interviewers_pkey];
ALTER TABLE [dbo].[interview_interviewers] DROP COLUMN [interviewer_id];
ALTER TABLE [dbo].[interview_interviewers] ADD [interviewer_nik] NVARCHAR(1000) NOT NULL;
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
