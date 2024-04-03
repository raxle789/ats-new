/*
  Warnings:

  - The primary key for the `efpk_job_vacancies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `efpk_job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `efpk_job_vacancies` table. All the data in the column will be lost.
  - Added the required column `job_vacancy_id` to the `efpk_job_vacancies` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[efpk_job_vacancies] DROP CONSTRAINT [efpk_job_vacancies_efpk_id_key];

-- AlterTable
ALTER TABLE [dbo].[efpk_job_vacancies] DROP CONSTRAINT [efpk_job_vacancies_pkey];
ALTER TABLE [dbo].[efpk_job_vacancies] DROP COLUMN [id],
[status];
ALTER TABLE [dbo].[efpk_job_vacancies] ADD [job_vacancy_id] INT NOT NULL;
ALTER TABLE [dbo].[efpk_job_vacancies] ADD CONSTRAINT efpk_job_vacancies_pkey PRIMARY KEY CLUSTERED ([efpk_id],[job_vacancy_id]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
