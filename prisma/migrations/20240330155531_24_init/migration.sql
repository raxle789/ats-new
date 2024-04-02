/*
  Warnings:

  - You are about to alter the column `value` on the `position_level_requirements` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(510)` to `Text`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[position_level_requirements] ALTER COLUMN [value] TEXT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[line_industries] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [created_at] DATETIME CONSTRAINT [line_industries_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    CONSTRAINT [line_industries_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[education_levels] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [created_at] DATETIME CONSTRAINT [education_levels_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    CONSTRAINT [education_levels_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
