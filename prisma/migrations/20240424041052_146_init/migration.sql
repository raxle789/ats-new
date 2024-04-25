/*
  Warnings:

  - You are about to drop the column `contact_name` on the `emergency_contacts` table. All the data in the column will be lost.
  - You are about to drop the column `collaborator_id` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `department_id` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `employment_type_id` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `expired_at` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `fpk_id` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `is_mcu` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `job_title_id` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `jobtitle` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `line_industry_id` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `pipeline_id` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `published_at` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `region_id` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `take_down` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `work_address` on the `job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `work_city_id` on the `job_vacancies` table. All the data in the column will be lost.
  - Added the required column `name` to the `emergency_contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relation_status` to the `emergency_contacts` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
EXEC SP_RENAME N'dbo.PK_8be191845b6fca1c4e5ba5bd7d1', N'emergency_contacts_pkey';
ALTER TABLE [dbo].[emergency_contacts] ALTER COLUMN [phone_number] NVARCHAR(510) NOT NULL;
ALTER TABLE [dbo].[emergency_contacts] DROP COLUMN [contact_name];
ALTER TABLE [dbo].[emergency_contacts] ADD [name] NVARCHAR(510) NOT NULL,
[relation_status] NVARCHAR(510) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[job_vacancies] ALTER COLUMN [is_video_interview] NVARCHAR(10) NULL;
ALTER TABLE [dbo].[job_vacancies] ALTER COLUMN [is_auto_assessment] NVARCHAR(10) NULL;
ALTER TABLE [dbo].[job_vacancies] ALTER COLUMN [is_confidential] NVARCHAR(10) NULL;
ALTER TABLE [dbo].[job_vacancies] ALTER COLUMN [is_career_fest] NVARCHAR(10) NULL;
ALTER TABLE [dbo].[job_vacancies] ALTER COLUMN [ta_id] INT NULL;
ALTER TABLE [dbo].[job_vacancies] DROP COLUMN [collaborator_id],
[company_id],
[created_by],
[deleted_at],
[department_id],
[employment_type_id],
[expired_at],
[fpk_id],
[is_mcu],
[job_title_id],
[jobtitle],
[line_industry_id],
[pipeline_id],
[published_at],
[region_id],
[slug],
[take_down],
[updated_by],
[user_id],
[work_address],
[work_city_id];
ALTER TABLE [dbo].[job_vacancies] ADD [efpk_request_no] NVARCHAR(255),
[employment_status_id] INT,
[expired_date] DATETIME,
[job_title_aliases] NVARCHAR(510),
[job_title_code] NVARCHAR(255),
[location_code] NVARCHAR(255),
[location_group_code] NVARCHAR(255),
[organization_group_code] NVARCHAR(255),
[published_date] DATETIME,
[vertical_id] INT,
[work_location_address] TEXT;

-- CreateTable
CREATE TABLE [dbo].[job_vacancy_requirements] (
    [job_vacancy_id] INT NOT NULL,
    [requirement_field_id] INT NOT NULL,
    [value] TEXT,
    CONSTRAINT [job_vacancy_requirements_pkey] PRIMARY KEY CLUSTERED ([job_vacancy_id],[requirement_field_id])
);

-- CreateTable
CREATE TABLE [dbo].[job_vacancy_line_industries] (
    [job_vacancy_id] INT NOT NULL,
    [line_industry_id] INT NOT NULL,
    CONSTRAINT [job_vacancy_line_industries_pkey] PRIMARY KEY CLUSTERED ([job_vacancy_id],[line_industry_id])
);

-- CreateTable
CREATE TABLE [dbo].[job_vacancy_ta] (
    [job_vacancy_id] INT NOT NULL,
    [ta_id] INT NOT NULL,
    CONSTRAINT [job_vacancy_ta_pkey] PRIMARY KEY CLUSTERED ([job_vacancy_id],[ta_id])
);

-- CreateTable
CREATE TABLE [dbo].[job_vacancy_users] (
    [job_vacancy_id] INT NOT NULL,
    [user_id] INT NOT NULL,
    CONSTRAINT [job_vacancy_users_pkey] PRIMARY KEY CLUSTERED ([job_vacancy_id],[user_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[efpk_job_vacancies] ADD CONSTRAINT [efpk_job_vacancies_job_vacancy_id_fkey] FOREIGN KEY ([job_vacancy_id]) REFERENCES [dbo].[job_vacancies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_requirements] ADD CONSTRAINT [job_vacancy_requirements_job_vacancy_id_fkey] FOREIGN KEY ([job_vacancy_id]) REFERENCES [dbo].[job_vacancies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_requirements] ADD CONSTRAINT [job_vacancy_requirements_requirement_field_id_fkey] FOREIGN KEY ([requirement_field_id]) REFERENCES [dbo].[requirement_fields]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_line_industries] ADD CONSTRAINT [job_vacancy_line_industries_job_vacancy_id_fkey] FOREIGN KEY ([job_vacancy_id]) REFERENCES [dbo].[job_vacancies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_line_industries] ADD CONSTRAINT [job_vacancy_line_industries_line_industry_id_fkey] FOREIGN KEY ([line_industry_id]) REFERENCES [dbo].[line_industries]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_ta] ADD CONSTRAINT [job_vacancy_ta_job_vacancy_id_fkey] FOREIGN KEY ([job_vacancy_id]) REFERENCES [dbo].[job_vacancies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_ta] ADD CONSTRAINT [job_vacancy_ta_ta_id_fkey] FOREIGN KEY ([ta_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_users] ADD CONSTRAINT [job_vacancy_users_job_vacancy_id_fkey] FOREIGN KEY ([job_vacancy_id]) REFERENCES [dbo].[job_vacancies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_users] ADD CONSTRAINT [job_vacancy_users_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
