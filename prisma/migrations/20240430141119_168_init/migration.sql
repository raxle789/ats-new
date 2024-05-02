/*
  Warnings:

  - You are about to drop the column `state_id` on the `candidate_states` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `states` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `state_name` to the `candidate_states` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[candidate_states] DROP CONSTRAINT [candidate_states_state_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[candidate_states] DROP COLUMN [state_id];
ALTER TABLE [dbo].[candidate_states] ADD [state_name] NVARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[states] ADD [alias] NVARCHAR(510);

-- CreateIndex
ALTER TABLE [dbo].[states] ADD CONSTRAINT [states_name_key] UNIQUE NONCLUSTERED ([name]);

-- AddForeignKey
ALTER TABLE [dbo].[candidate_states] ADD CONSTRAINT [candidate_states_state_name_fkey] FOREIGN KEY ([state_name]) REFERENCES [dbo].[states]([name]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
