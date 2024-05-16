/*
  Warnings:

  - A unique constraint covering the columns `[remote_id]` on the table `candidate_state_assessments` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[candidate_state_assessments] ADD CONSTRAINT [candidate_state_assessments_remote_id_key] UNIQUE NONCLUSTERED ([remote_id]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
