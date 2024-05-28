/*
  Warnings:

  - The primary key for the `candidate_state_interviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `candidate_state_interviews` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `interviews` table. All the data in the column will be lost.
  - You are about to drop the column `interview_result_id` on the `interviews` table. All the data in the column will be lost.
  - You are about to drop the column `interviewer_id` on the `interviews` table. All the data in the column will be lost.
  - Added the required column `date_time` to the `interviews` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[interviews] DROP CONSTRAINT [interviews_interviewer_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[candidate_state_interviews] DROP CONSTRAINT [candidate_state_interviews_pkey];
ALTER TABLE [dbo].[candidate_state_interviews] DROP COLUMN [id];
ALTER TABLE [dbo].[candidate_state_interviews] ADD CONSTRAINT candidate_state_interviews_pkey PRIMARY KEY CLUSTERED ([candidate_state_id],[interview_id]);

-- AlterTable
ALTER TABLE [dbo].[interviews] DROP COLUMN [date],
[interview_result_id],
[interviewer_id];
ALTER TABLE [dbo].[interviews] ADD [date_time] DATETIME NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[interview_interviewers] (
    [interview_id] INT NOT NULL,
    [interviewer_id] NVARCHAR(1000) NOT NULL,
    [interview_result_id] INT,
    CONSTRAINT [interview_interviewers_pkey] PRIMARY KEY CLUSTERED ([interview_id],[interviewer_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[interview_interviewers] ADD CONSTRAINT [interview_interviewers_interview_id_fkey] FOREIGN KEY ([interview_id]) REFERENCES [dbo].[interviews]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
