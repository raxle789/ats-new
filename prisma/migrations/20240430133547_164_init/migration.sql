/*
  Warnings:

  - The primary key for the `candidate_states` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `candidate_states` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[candidate_states] DROP CONSTRAINT [candidate_states_pkey];
ALTER TABLE [dbo].[candidate_states] ADD [id] INT NOT NULL IDENTITY(1,1);
ALTER TABLE [dbo].[candidate_states] ADD CONSTRAINT candidate_states_pkey PRIMARY KEY CLUSTERED ([id]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
