/*
  Warnings:

  - You are about to alter the column `fpk_id` on the `job_vacancies` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(255)` to `Int`.
  - You are about to drop the `job_functions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job_title` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[job_vacancies] ALTER COLUMN [fpk_id] INT NULL;

-- DropTable
DROP TABLE [dbo].[job_functions];

-- DropTable
DROP TABLE [dbo].[job_title];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
