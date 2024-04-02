/*
  Warnings:

  - The primary key for the `position_level_requirements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `requirement_level_id` on the `position_level_requirements` table. All the data in the column will be lost.
  - You are about to drop the `position_level_requirement_fields` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `requirement_field_id` to the `position_level_requirements` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[position_level_requirements] DROP CONSTRAINT [position_level_requirements_requirement_field_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[position_level_requirements] DROP CONSTRAINT [position_level_requirements_pkey];
ALTER TABLE [dbo].[position_level_requirements] DROP COLUMN [requirement_level_id];
ALTER TABLE [dbo].[position_level_requirements] ADD [requirement_field_id] INT NOT NULL;
ALTER TABLE [dbo].[position_level_requirements] ADD CONSTRAINT position_level_requirements_pkey PRIMARY KEY CLUSTERED ([position_level_id],[requirement_field_id]);

-- DropTable
DROP TABLE [dbo].[position_level_requirement_fields];

-- CreateTable
CREATE TABLE [dbo].[requirement_fields] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [created_at] DATETIME CONSTRAINT [requirement_fields_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [requirement_fields_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[position_level_requirements] ADD CONSTRAINT [position_level_requirements_requirement_field_id_fkey] FOREIGN KEY ([requirement_field_id]) REFERENCES [dbo].[requirement_fields]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
