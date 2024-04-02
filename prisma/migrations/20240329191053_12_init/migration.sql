/*
  Warnings:

  - You are about to drop the column `updated_atj` on the `position_levels` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `position_levels` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[position_levels] DROP COLUMN [updated_atj];
ALTER TABLE [dbo].[position_levels] ADD [updated_at] DATETIME NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
