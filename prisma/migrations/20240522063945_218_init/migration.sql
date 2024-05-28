/*
  Warnings:

  - You are about to drop the column `message_template_id` on the `interviews` table. All the data in the column will be lost.
  - Added the required column `message` to the `interviews` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[interviews] DROP CONSTRAINT [interviews_message_template_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[interviews] DROP COLUMN [message_template_id];
ALTER TABLE [dbo].[interviews] ADD [message] TEXT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
