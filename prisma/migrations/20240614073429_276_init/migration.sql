/*
  Warnings:

  - You are about to drop the column `location_group_code` on the `job_vacancies` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[job_vacancies] DROP COLUMN [location_group_code];
ALTER TABLE [dbo].[job_vacancies] ADD [region_id] INT;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancies] ADD CONSTRAINT [job_vacancies_region_id_fkey] FOREIGN KEY ([region_id]) REFERENCES [dbo].[regions]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
