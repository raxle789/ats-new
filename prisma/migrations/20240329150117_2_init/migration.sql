/*
  Warnings:

  - You are about to drop the `job_levels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job_vacancy_parameter_requirements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job_vacancy_parameters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job_vacancy_requirements` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[job_vacancy_parameter_requirements] DROP CONSTRAINT [FK_Parameter];

-- DropForeignKey
ALTER TABLE [dbo].[job_vacancy_parameter_requirements] DROP CONSTRAINT [FK_Requirement];

-- DropForeignKey
ALTER TABLE [dbo].[job_vacancy_parameters] DROP CONSTRAINT [FK_JobLevel];

-- DropTable
DROP TABLE [dbo].[job_levels];

-- DropTable
DROP TABLE [dbo].[job_vacancy_parameter_requirements];

-- DropTable
DROP TABLE [dbo].[job_vacancy_parameters];

-- DropTable
DROP TABLE [dbo].[job_vacancy_requirements];

-- CreateTable
CREATE TABLE [dbo].[position_level_requirement_fields] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [position_level_requirement_fields_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL,
    CONSTRAINT [position_level_requirement_fields_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[position_level_requirements] (
    [position_levels_id] INT NOT NULL,
    [requirement_levels_id] INT NOT NULL,
    [value] NVARCHAR(510) NOT NULL,
    CONSTRAINT [position_level_requirements_pkey] PRIMARY KEY CLUSTERED ([position_levels_id],[requirement_levels_id])
);

-- CreateTable
CREATE TABLE [dbo].[position_levels] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [level] INT NOT NULL,
    [score] INT NOT NULL,
    [sla_days] INT,
    [created_at] DATETIME NOT NULL CONSTRAINT [position_levels_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_atj] DATETIME NOT NULL,
    CONSTRAINT [position_levels_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[position_level_requirements] ADD CONSTRAINT [position_level_requirements_position_levels_id_fkey] FOREIGN KEY ([position_levels_id]) REFERENCES [dbo].[position_levels]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[position_level_requirements] ADD CONSTRAINT [position_level_requirements_requirement_levels_id_fkey] FOREIGN KEY ([requirement_levels_id]) REFERENCES [dbo].[position_level_requirement_fields]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
