/*
  Warnings:

  - You are about to drop the column `employment_status_id` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `vertical_id` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the `candidate_languages` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `employment_status` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `verticals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employment_status_name` to the `job_vacancies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidate_id` to the `languages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `languages` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[candidate_languages] DROP CONSTRAINT [candidate_languages_candidate_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[candidate_languages] DROP CONSTRAINT [candidate_languages_language_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[candidate_languages] DROP CONSTRAINT [candidate_languages_proficiency_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[job_vacancies] DROP COLUMN [employment_status_id],
[vertical_id];
ALTER TABLE [dbo].[job_vacancies] ADD [employment_status_name] NVARCHAR(255) NOT NULL,
[vertical_code] NVARCHAR(255);

-- AlterTable
ALTER TABLE [dbo].[languages] ADD [candidate_id] INT NOT NULL,
[level] NVARCHAR(510) NOT NULL;

-- DropTable
DROP TABLE [dbo].[candidate_languages];

-- CreateIndex
ALTER TABLE [dbo].[employment_status] ADD CONSTRAINT [employment_status_name_key] UNIQUE NONCLUSTERED ([name]);

-- CreateIndex
ALTER TABLE [dbo].[verticals] ADD CONSTRAINT [verticals_code_key] UNIQUE NONCLUSTERED ([code]);

-- AddForeignKey
ALTER TABLE [dbo].[languages] ADD CONSTRAINT [languages_candidate_id_fkey] FOREIGN KEY ([candidate_id]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
