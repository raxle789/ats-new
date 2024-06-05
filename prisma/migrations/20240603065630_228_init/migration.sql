/*
  Warnings:

  - Added the required column `sourceId` to the `candidates` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[candidates] ADD [sourceId] INT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[sources] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [created_at] DATETIME CONSTRAINT [sources_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [sources_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[candidates] ADD CONSTRAINT [candidates_sourceId_fkey] FOREIGN KEY ([sourceId]) REFERENCES [dbo].[sources]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[candidate_skills] ADD CONSTRAINT [FK_candidates_skills_to_candidates] FOREIGN KEY ([id_of_candidate]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[candidate_skills] ADD CONSTRAINT [FK_candidate_skills_to_skills] FOREIGN KEY ([id_of_skill]) REFERENCES [dbo].[skills]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
