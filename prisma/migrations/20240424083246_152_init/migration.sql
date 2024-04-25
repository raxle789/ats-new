/*
  Warnings:

  - You are about to drop the column `efpk_request_no` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `position_level_id` on the `job_vacancies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[level]` on the table `position_levels` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[job_vacancies] ALTER COLUMN [employment_status_name] NVARCHAR(510) NULL;
ALTER TABLE [dbo].[job_vacancies] DROP COLUMN [efpk_request_no],
[position_level_id];
ALTER TABLE [dbo].[job_vacancies] ADD [position_level] INT;

-- CreateIndex
ALTER TABLE [dbo].[position_levels] ADD CONSTRAINT [position_levels_level_key] UNIQUE NONCLUSTERED ([level]);

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancies] ADD CONSTRAINT [job_vacancies_job_function_id_fkey] FOREIGN KEY ([job_function_id]) REFERENCES [dbo].[job_functions]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancies] ADD CONSTRAINT [job_vacancies_employment_status_name_fkey] FOREIGN KEY ([employment_status_name]) REFERENCES [dbo].[employment_status]([name]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancies] ADD CONSTRAINT [job_vacancies_position_level_fkey] FOREIGN KEY ([position_level]) REFERENCES [dbo].[position_levels]([level]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancies] ADD CONSTRAINT [job_vacancies_vertical_code_fkey] FOREIGN KEY ([vertical_code]) REFERENCES [dbo].[verticals]([code]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
