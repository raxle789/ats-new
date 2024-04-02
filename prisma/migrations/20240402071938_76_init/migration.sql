/*
  Warnings:

  - The primary key for the `position_level_requirements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `position_levels_id` on the `position_level_requirements` table. All the data in the column will be lost.
  - You are about to drop the column `requirement_levels_id` on the `position_level_requirements` table. All the data in the column will be lost.
  - Added the required column `position_level_id` to the `position_level_requirements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirement_level_id` to the `position_level_requirements` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[position_level_requirements] DROP CONSTRAINT [position_level_requirements_position_levels_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[position_level_requirements] DROP CONSTRAINT [position_level_requirements_requirement_levels_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[position_level_requirements] DROP CONSTRAINT [position_level_requirements_pkey];
ALTER TABLE [dbo].[position_level_requirements] ALTER COLUMN [value] TEXT NULL;
ALTER TABLE [dbo].[position_level_requirements] DROP COLUMN [position_levels_id],
[requirement_levels_id];
ALTER TABLE [dbo].[position_level_requirements] ADD [position_level_id] INT NOT NULL,
[requirement_level_id] INT NOT NULL;
ALTER TABLE [dbo].[position_level_requirements] ADD CONSTRAINT position_level_requirements_pkey PRIMARY KEY CLUSTERED ([position_level_id],[requirement_level_id]);

-- AddForeignKey
ALTER TABLE [dbo].[position_level_requirements] ADD CONSTRAINT [position_level_requirements_position_level_id_fkey] FOREIGN KEY ([position_level_id]) REFERENCES [dbo].[position_levels]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[position_level_requirements] ADD CONSTRAINT [position_level_requirements_requirement_level_id_fkey] FOREIGN KEY ([requirement_level_id]) REFERENCES [dbo].[position_level_requirement_fields]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
