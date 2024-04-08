/*
  Warnings:

  - You are about to drop the column `approval_date` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `approval_description` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `approval_name` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `approval_nik` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `reject_date` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `efpk_initiator_informations` table. All the data in the column will be lost.
  - You are about to drop the `phones` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[phones] DROP CONSTRAINT [phones_user_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[efpk] DROP COLUMN [approval_date],
[approval_description],
[approval_name],
[approval_nik],
[reject_date];
ALTER TABLE [dbo].[efpk] ADD [approval_date_1] NVARCHAR(30),
[approval_date_2] NVARCHAR(30),
[approval_date_3] NVARCHAR(30),
[approval_date_4] NVARCHAR(30),
[approval_date_5] NVARCHAR(30),
[approval_date_6] NVARCHAR(30),
[approval_date_7] NVARCHAR(30),
[approval_date_8] NVARCHAR(30),
[approval_date_9] NVARCHAR(30),
[approval_description_1] NVARCHAR(255),
[approval_description_2] NVARCHAR(255),
[approval_description_3] NVARCHAR(255),
[approval_description_4] NVARCHAR(255),
[approval_description_5] NVARCHAR(255),
[approval_description_6] NVARCHAR(255),
[approval_description_7] NVARCHAR(255),
[approval_description_8] NVARCHAR(255),
[approval_description_9] NVARCHAR(255),
[approval_name_1] NVARCHAR(80),
[approval_name_2] NVARCHAR(80),
[approval_name_3] NVARCHAR(80),
[approval_name_4] NVARCHAR(80),
[approval_name_5] NVARCHAR(80),
[approval_name_6] NVARCHAR(80),
[approval_name_7] NVARCHAR(80),
[approval_name_8] NVARCHAR(80),
[approval_name_9] NVARCHAR(80),
[approval_nik_1] NVARCHAR(25),
[approval_nik_2] NVARCHAR(25),
[approval_nik_3] NVARCHAR(25),
[approval_nik_4] NVARCHAR(25),
[approval_nik_5] NVARCHAR(25),
[approval_nik_6] NVARCHAR(25),
[approval_nik_7] NVARCHAR(25),
[approval_nik_8] NVARCHAR(25),
[approval_nik_9] NVARCHAR(25),
[org_group_code] NVARCHAR(25),
[org_group_name] NVARCHAR(80),
[reject_date_1] NVARCHAR(30),
[reject_date_2] NVARCHAR(30),
[reject_date_3] NVARCHAR(30),
[reject_date_4] NVARCHAR(30),
[reject_date_5] NVARCHAR(30),
[reject_date_6] NVARCHAR(30),
[reject_date_7] NVARCHAR(30),
[reject_date_8] NVARCHAR(30),
[reject_date_9] NVARCHAR(30),
[req_appr_date] DATETIME,
[req_appr_emp_id] INT,
[req_reject_desc] NVARCHAR(255),
[total_layer_approval] INT;

-- AlterTable
ALTER TABLE [dbo].[efpk_initiator_informations] DROP COLUMN [phone];

-- DropTable
DROP TABLE [dbo].[phones];

-- CreateTable
CREATE TABLE [dbo].[Phones] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [type] NVARCHAR(510),
    [number] NVARCHAR(510),
    [status] NVARCHAR(510),
    [current] INT,
    [created_at] DATETIME CONSTRAINT [Phones_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [Phones_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[job_title] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [code] VARCHAR(15) NOT NULL,
    [name] VARCHAR(510) NOT NULL,
    [created_at] DATETIME CONSTRAINT [job_title_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [job_title_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[job_functions] (
    [id] INT NOT NULL,
    [name] NVARCHAR(510) NOT NULL,
    [created_at] DATETIME CONSTRAINT [job_functions_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [job_functions_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[job_vacancies] (
    [id] INT NOT NULL IDENTITY(1,1),
    [slug] NVARCHAR(510),
    [jobtitle] NVARCHAR(510),
    [work_address] NVARCHAR(max),
    [published_at] DATETIME,
    [expired_at] DATETIME NOT NULL,
    [take_down] SMALLINT NOT NULL,
    [job_description] TEXT,
    [job_requirement] TEXT,
    [is_video_interview] NVARCHAR(10) NOT NULL,
    [is_auto_assessment] NVARCHAR(10) NOT NULL,
    [is_confidential] NVARCHAR(10) NOT NULL,
    [is_career_fest] NVARCHAR(10) NOT NULL,
    [is_mcu] NVARCHAR(10) NOT NULL,
    [created_by] INT NOT NULL,
    [updated_by] INT NOT NULL,
    [created_at] DATETIME CONSTRAINT [job_vacancies_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    [deleted_at] DATETIME,
    [ta_id] INT NOT NULL,
    [fpk_id] NVARCHAR(255),
    [company_id] INT,
    [job_title_id] INT,
    [job_function_id] INT,
    [employment_type_id] INT,
    [position_level_id] INT,
    [department_id] INT,
    [line_industry_id] INT,
    [region_id] INT,
    [work_city_id] INT,
    [collaborator_id] INT,
    [user_id] INT,
    [pipeline_id] INT,
    CONSTRAINT [job_vacancies_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Phones] ADD CONSTRAINT [Phones_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
