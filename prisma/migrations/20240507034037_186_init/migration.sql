/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `education_levels` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[educations] ALTER COLUMN [level] NVARCHAR(510) NULL;

-- CreateIndex
ALTER TABLE [dbo].[education_levels] ADD CONSTRAINT [education_levels_name_key] UNIQUE NONCLUSTERED ([name]);

-- AddForeignKey
ALTER TABLE [dbo].[educations] ADD CONSTRAINT [educations_level_fkey] FOREIGN KEY ([level]) REFERENCES [dbo].[education_levels]([name]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
