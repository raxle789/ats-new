/*
  Warnings:

  - You are about to drop the column `candidate_id` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `is_current` on the `addresses` table. All the data in the column will be lost.
  - You are about to alter the column `city` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(510)` to `NVarChar(128)`.
  - You are about to alter the column `country` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(510)` to `NVarChar(64)`.
  - You are about to alter the column `rt` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(510)` to `NVarChar(3)`.
  - You are about to alter the column `rw` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(510)` to `NVarChar(3)`.
  - You are about to alter the column `street` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(510)` to `NVarChar(128)`.
  - You are about to alter the column `subdistrict` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(510)` to `NVarChar(128)`.
  - You are about to alter the column `village` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(510)` to `NVarChar(128)`.
  - You are about to alter the column `zip_code` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(510)` to `NVarChar(16)`.
  - You are about to alter the column `current_address` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `NVarChar(512)`.
  - You are about to drop the column `candidate_id` on the `certifications` table. All the data in the column will be lost.
  - You are about to drop the column `certificate_id` on the `certifications` table. All the data in the column will be lost.
  - You are about to alter the column `institution_name` on the `certifications` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(510)` to `NVarChar(128)`.
  - You are about to drop the column `candidateId` on the `educations` table. All the data in the column will be lost.
  - You are about to drop the column `city_of_school` on the `educations` table. All the data in the column will be lost.
  - You are about to drop the column `is_graduate` on the `educations` table. All the data in the column will be lost.
  - You are about to drop the column `is_latest` on the `educations` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `educations` table. All the data in the column will be lost.
  - You are about to drop the column `major` on the `educations` table. All the data in the column will be lost.
  - The `end_year` column on the `educations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `candidate_id` on the `families` table. All the data in the column will be lost.
  - You are about to drop the column `relationStatus` on the `families` table. All the data in the column will be lost.
  - You are about to alter the column `gender` on the `families` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(255)` to `NVarChar(16)`.
  - You are about to drop the column `candidate_id` on the `languages` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `languages` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `languages` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(510)` to `NVarChar(128)`.
  - You are about to drop the column `candidateId` on the `working_experiences` table. All the data in the column will be lost.
  - You are about to drop the column `is_currently` on the `working_experiences` table. All the data in the column will be lost.
  - You are about to alter the column `company_name` on the `working_experiences` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(256)` to `NVarChar(128)`.
  - You are about to alter the column `line_industry` on the `working_experiences` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(128)` to `NVarChar(64)`.
  - You are about to alter the column `job_function` on the `working_experiences` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(256)` to `NVarChar(64)`.
  - You are about to drop the `candidate_state_interviews` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `candidate_skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `candidate_id` on the `candidate_skills` table. All the data in the column will be lost.
  - You are about to drop the column `skill_id` on the `candidate_skills` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_of_candidate]` on the table `educations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_of_candidate` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `id_of_candidate` to the `certifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_of_certificate` to the `certifications` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `certifications` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `city` to the `educations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edu_level` to the `educations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edu_major` to the `educations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_of_candidate` to the `educations` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `start_year` on the `educations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `id_of_candidate` to the `families` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relation` to the `families` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `families` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `candidate_state_id` to the `interviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_of_candidate` to the `languages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proficiency` to the `languages` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `languages` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `id_of_candidate` to the `working_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_of_candidate` to the `candidate_skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_of_skill` to the `candidate_skills` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[addresses] DROP CONSTRAINT [addresses_candidate_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[candidate_state_interviews] DROP CONSTRAINT [candidate_state_interviews_candidate_state_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[candidate_state_interviews] DROP CONSTRAINT [candidate_state_interviews_interview_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[certifications] DROP CONSTRAINT [certifications_candidate_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[certifications] DROP CONSTRAINT [certifications_certificate_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[educations] DROP CONSTRAINT [educations_candidateId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[educations] DROP CONSTRAINT [educations_level_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[families] DROP CONSTRAINT [families_candidate_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[languages] DROP CONSTRAINT [languages_candidate_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[working_experiences] DROP CONSTRAINT [FK_fdb1fb1f815620c2f82557fdc39];

-- DropIndex
ALTER TABLE [dbo].[educations] DROP CONSTRAINT [educations_candidateId_key];

-- AlterTable
ALTER TABLE [dbo].[addresses] ALTER COLUMN [city] NVARCHAR(128) NOT NULL;
ALTER TABLE [dbo].[addresses] ALTER COLUMN [country] NVARCHAR(64) NOT NULL;
ALTER TABLE [dbo].[addresses] ALTER COLUMN [created_at] DATETIME NOT NULL;
ALTER TABLE [dbo].[addresses] ALTER COLUMN [rt] NVARCHAR(3) NULL;
ALTER TABLE [dbo].[addresses] ALTER COLUMN [rw] NVARCHAR(3) NULL;
ALTER TABLE [dbo].[addresses] ALTER COLUMN [street] NVARCHAR(128) NOT NULL;
ALTER TABLE [dbo].[addresses] ALTER COLUMN [subdistrict] NVARCHAR(128) NULL;
ALTER TABLE [dbo].[addresses] ALTER COLUMN [village] NVARCHAR(128) NULL;
ALTER TABLE [dbo].[addresses] ALTER COLUMN [zip_code] NVARCHAR(16) NOT NULL;
ALTER TABLE [dbo].[addresses] ALTER COLUMN [current_address] NVARCHAR(512) NULL;
ALTER TABLE [dbo].[addresses] DROP COLUMN [candidate_id],
[is_current];
ALTER TABLE [dbo].[addresses] ADD [id_of_candidate] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[certifications] ALTER COLUMN [created_at] DATETIME NOT NULL;
ALTER TABLE [dbo].[certifications] ALTER COLUMN [institution_name] NVARCHAR(128) NOT NULL;
ALTER TABLE [dbo].[certifications] DROP COLUMN [candidate_id],
[certificate_id];
ALTER TABLE [dbo].[certifications] ADD [id_of_candidate] INT NOT NULL,
[id_of_certificate] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[educations] DROP COLUMN [candidateId],
[city_of_school],
[is_graduate],
[is_latest],
[level],
[major],
[start_year],
[end_year];
ALTER TABLE [dbo].[educations] ADD [city] NVARCHAR(510) NOT NULL,
[edu_level] NVARCHAR(510) NOT NULL,
[edu_major] NVARCHAR(128) NOT NULL,
[id_of_candidate] INT NOT NULL,
[status] NVARCHAR(16),
[start_year] DATE NOT NULL,
[end_year] DATE;

-- AlterTable
ALTER TABLE [dbo].[families] ALTER COLUMN [name] NVARCHAR(512) NOT NULL;
ALTER TABLE [dbo].[families] ALTER COLUMN [created_at] DATETIME NOT NULL;
ALTER TABLE [dbo].[families] ALTER COLUMN [gender] NVARCHAR(16) NOT NULL;
ALTER TABLE [dbo].[families] DROP COLUMN [candidate_id],
[relationStatus];
ALTER TABLE [dbo].[families] ADD [id_of_candidate] INT NOT NULL,
[relation] NVARCHAR(16) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[interviews] ADD [candidate_state_id] INT NOT NULL,
[created_at] DATETIME CONSTRAINT [interviews_created_at_df] DEFAULT CURRENT_TIMESTAMP,
[is_email_sent] BIT CONSTRAINT [interviews_is_email_sent_df] DEFAULT 0,
[updated_at] DATETIME;

-- AlterTable
ALTER TABLE [dbo].[languages] ALTER COLUMN [name] NVARCHAR(128) NOT NULL;
ALTER TABLE [dbo].[languages] ALTER COLUMN [created_at] DATETIME NOT NULL;
ALTER TABLE [dbo].[languages] DROP COLUMN [candidate_id],
[level];
ALTER TABLE [dbo].[languages] ADD [id_of_candidate] INT NOT NULL,
[proficiency] NVARCHAR(64) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[working_experiences] ALTER COLUMN [company_name] NVARCHAR(128) NOT NULL;
ALTER TABLE [dbo].[working_experiences] ALTER COLUMN [line_industry] NVARCHAR(64) NOT NULL;
ALTER TABLE [dbo].[working_experiences] ALTER COLUMN [job_function] NVARCHAR(64) NOT NULL;
ALTER TABLE [dbo].[working_experiences] ALTER COLUMN [job_description] NVARCHAR(512) NULL;
ALTER TABLE [dbo].[working_experiences] ALTER COLUMN [salary] BIGINT NOT NULL;
ALTER TABLE [dbo].[working_experiences] ALTER COLUMN [end_at] DATE NULL;
ALTER TABLE [dbo].[working_experiences] DROP COLUMN [candidateId],
[is_currently];
ALTER TABLE [dbo].[working_experiences] ADD [id_of_candidate] INT NOT NULL,
[status] NVARCHAR(16);

-- DropTable
DROP TABLE [dbo].[candidate_state_interviews];

-- RedefineTables
BEGIN TRANSACTION;
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'candidate_skills'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_candidate_skills] (
    [id_of_candidate] INT NOT NULL,
    [id_of_skill] INT NOT NULL,
    CONSTRAINT [candidate_skills_pkey] PRIMARY KEY CLUSTERED ([id_of_candidate],[id_of_skill])
);
IF EXISTS(SELECT * FROM [dbo].[candidate_skills])
    EXEC('INSERT INTO [dbo].[_prisma_new_candidate_skills] () SELECT  FROM [dbo].[candidate_skills] WITH (holdlock tablockx)');
DROP TABLE [dbo].[candidate_skills];
EXEC SP_RENAME N'dbo._prisma_new_candidate_skills', N'candidate_skills';
COMMIT;

-- CreateIndex
ALTER TABLE [dbo].[educations] ADD CONSTRAINT [educations_candidateId_key] UNIQUE NONCLUSTERED ([id_of_candidate]);

-- AddForeignKey
ALTER TABLE [dbo].[addresses] ADD CONSTRAINT [FK_addresses_to_candidates] FOREIGN KEY ([id_of_candidate]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[languages] ADD CONSTRAINT [FK_languages_to_candidates] FOREIGN KEY ([id_of_candidate]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[certifications] ADD CONSTRAINT [FK_certifications_to_candidates] FOREIGN KEY ([id_of_candidate]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[certifications] ADD CONSTRAINT [FK_certifications_to_certificates] FOREIGN KEY ([id_of_certificate]) REFERENCES [dbo].[certificates]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[educations] ADD CONSTRAINT [FK_educations_to_candidates] FOREIGN KEY ([id_of_candidate]) REFERENCES [dbo].[candidates]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[families] ADD CONSTRAINT [FK_families_to_candidates] FOREIGN KEY ([id_of_candidate]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[working_experiences] ADD CONSTRAINT [FK_wexperiences_to_candidates] FOREIGN KEY ([id_of_candidate]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[interviews] ADD CONSTRAINT [interviews_candidate_state_id_fkey] FOREIGN KEY ([candidate_state_id]) REFERENCES [dbo].[candidate_states]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
