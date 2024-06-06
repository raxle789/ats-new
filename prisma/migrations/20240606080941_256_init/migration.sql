BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[interview_interviewers] DROP CONSTRAINT [interview_interviewers_interview_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[interview_interviewers] DROP CONSTRAINT [interview_interviewers_interview_result_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[interview_results] ADD [candidateReschedulerId] INT,
[rescheduler] NVARCHAR(510),
[userReschedulerNik] NVARCHAR(510);

-- AddForeignKey
ALTER TABLE [dbo].[interview_interviewers] ADD CONSTRAINT [interview_interviewers_interview_id_fkey] FOREIGN KEY ([interview_id]) REFERENCES [dbo].[interviews]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[interview_interviewers] ADD CONSTRAINT [interview_interviewers_interview_result_id_fkey] FOREIGN KEY ([interview_result_id]) REFERENCES [dbo].[interview_results]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[interview_results] ADD CONSTRAINT [interview_results_candidateReschedulerId_fkey] FOREIGN KEY ([candidateReschedulerId]) REFERENCES [dbo].[candidates]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
