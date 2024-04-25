/*
  Warnings:

  - You are about to drop the column `postal_code` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `street_address` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `candidateId` on the `certifications` table. All the data in the column will be lost.
  - You are about to drop the column `certification_name` on the `certifications` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `certifications` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `educations` table. All the data in the column will be lost.
  - You are about to drop the `example_1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `example_2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `example_3` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `familys` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `candidate_id` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_current` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rt` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rw` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subdistrict` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `village` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidate_id` to the `certifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `certificate_id` to the `certifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institution_name` to the `certifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issued_date` to the `certifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city_of_school` to the `educations` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_a53ea01ce0f52efa194dbb49f39];

-- DropForeignKey
ALTER TABLE [dbo].[certifications] DROP CONSTRAINT [FK_309f34896c518983111ebeca641];

-- DropForeignKey
ALTER TABLE [dbo].[example_2] DROP CONSTRAINT [FK_0794609c75f558a527d031b5229];

-- DropForeignKey
ALTER TABLE [dbo].[familys] DROP CONSTRAINT [FK_4122f645771e9e2938abfd8c0c5];

-- AlterTable
ALTER TABLE [dbo].[addresses] DROP CONSTRAINT [DF_35936c20d74117b96ca37c06dbf];
EXEC SP_RENAME N'dbo.PK_745d8f43d3af10ab8247465e450', N'addresses_pkey';
ALTER TABLE [dbo].[addresses] ALTER COLUMN [city] NVARCHAR(510) NOT NULL;
ALTER TABLE [dbo].[addresses] ALTER COLUMN [country] NVARCHAR(510) NOT NULL;
ALTER TABLE [dbo].[addresses] DROP COLUMN [postal_code],
[province],
[street_address];
ALTER TABLE [dbo].[addresses] ADD [candidate_id] INT NOT NULL,
[created_at] DATETIME CONSTRAINT [addresses_created_at_df] DEFAULT CURRENT_TIMESTAMP,
[is_current] NVARCHAR(510) NOT NULL,
[rt] NVARCHAR(510) NOT NULL,
[rw] NVARCHAR(510) NOT NULL,
[street] NVARCHAR(510) NOT NULL,
[subdistrict] NVARCHAR(510) NOT NULL,
[updated_at] DATETIME,
[village] NVARCHAR(510) NOT NULL,
[zip_code] NVARCHAR(510) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[candidates] DROP COLUMN [addressId];
ALTER TABLE [dbo].[candidates] ADD [marital_status] NVARCHAR(256);

-- AlterTable
ALTER TABLE [dbo].[certifications] DROP CONSTRAINT [DF_804840a17448cc76bd307be181c];
EXEC SP_RENAME N'dbo.PK_fd763d412e4a1fb1b6dadd6e72b', N'certifications_pkey';
ALTER TABLE [dbo].[certifications] ALTER COLUMN [created_at] DATETIME NULL;
ALTER TABLE [dbo].[certifications] DROP COLUMN [candidateId],
[certification_name],
[url];
ALTER TABLE [dbo].[certifications] ADD [candidate_id] INT NOT NULL,
[certificate_id] INT NOT NULL,
[institution_name] NVARCHAR(510) NOT NULL,
[issued_date] DATE NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[educations] DROP COLUMN [language];
ALTER TABLE [dbo].[educations] ADD [city_of_school] NVARCHAR(510) NOT NULL;

-- DropTable
DROP TABLE [dbo].[example_1];

-- DropTable
DROP TABLE [dbo].[example_2];

-- DropTable
DROP TABLE [dbo].[example_3];

-- DropTable
DROP TABLE [dbo].[familys];

-- CreateTable
CREATE TABLE [dbo].[languages] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [created_at] DATETIME CONSTRAINT [languages_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [languages_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[proficiencies] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [created_at] DATETIME CONSTRAINT [proficiencies_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [proficiencies_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[candidate_languages] (
    [candidate_id] INT NOT NULL,
    [language_id] INT NOT NULL,
    [proficiency_id] INT NOT NULL,
    CONSTRAINT [candidate_languages_pkey] PRIMARY KEY CLUSTERED ([candidate_id],[language_id])
);

-- CreateTable
CREATE TABLE [dbo].[families] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [date_of_birth] DATE NOT NULL,
    [relationStatus] NVARCHAR(510) NOT NULL,
    [candidate_id] INT NOT NULL,
    [gender_id] INT NOT NULL,
    [created_at] DATETIME CONSTRAINT [families_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [families_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[candidate_skills] (
    [candidate_id] INT NOT NULL,
    [skill_id] INT NOT NULL,
    CONSTRAINT [candidate_skills_pkey] PRIMARY KEY CLUSTERED ([candidate_id],[skill_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[addresses] ADD CONSTRAINT [addresses_candidate_id_fkey] FOREIGN KEY ([candidate_id]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[candidate_languages] ADD CONSTRAINT [candidate_languages_candidate_id_fkey] FOREIGN KEY ([candidate_id]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[candidate_languages] ADD CONSTRAINT [candidate_languages_language_id_fkey] FOREIGN KEY ([language_id]) REFERENCES [dbo].[languages]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[candidate_languages] ADD CONSTRAINT [candidate_languages_proficiency_id_fkey] FOREIGN KEY ([proficiency_id]) REFERENCES [dbo].[proficiencies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[certifications] ADD CONSTRAINT [certifications_certificate_id_fkey] FOREIGN KEY ([certificate_id]) REFERENCES [dbo].[certificates]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[certifications] ADD CONSTRAINT [certifications_candidate_id_fkey] FOREIGN KEY ([candidate_id]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[families] ADD CONSTRAINT [families_candidate_id_fkey] FOREIGN KEY ([candidate_id]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[families] ADD CONSTRAINT [families_gender_id_fkey] FOREIGN KEY ([gender_id]) REFERENCES [dbo].[genders]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[candidate_skills] ADD CONSTRAINT [candidate_skills_candidate_id_fkey] FOREIGN KEY ([candidate_id]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[candidate_skills] ADD CONSTRAINT [candidate_skills_skill_id_fkey] FOREIGN KEY ([skill_id]) REFERENCES [dbo].[skills]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
