/*
  Warnings:

  - You are about to drop the column `updated_at` on the `efpk_ta_transaction` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[efpk_ta_transaction] DROP COLUMN [updated_at];

-- AlterTable
ALTER TABLE [dbo].[position_level_requirement_fields] ALTER COLUMN [created_at] DATETIME NULL;
ALTER TABLE [dbo].[position_level_requirement_fields] ALTER COLUMN [updated_at] DATETIME NULL;

-- AlterTable
ALTER TABLE [dbo].[position_levels] ALTER COLUMN [created_at] DATETIME NULL;
ALTER TABLE [dbo].[position_levels] ALTER COLUMN [updated_at] DATETIME NULL;

-- AlterTable
ALTER TABLE [dbo].[roles] ALTER COLUMN [created_at] DATETIME NULL;
ALTER TABLE [dbo].[roles] ALTER COLUMN [updated_at] DATETIME NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
