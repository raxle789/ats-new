/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `candidates` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[candidateId]` on the table `educations` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[educations] DROP CONSTRAINT [FK_da1ce5966e5d5a43a9e0797e0c0];

-- CreateIndex
ALTER TABLE [dbo].[candidates] ADD CONSTRAINT [candidates_userId_key] UNIQUE NONCLUSTERED ([userId]);

-- CreateIndex
ALTER TABLE [dbo].[educations] ADD CONSTRAINT [educations_candidateId_key] UNIQUE NONCLUSTERED ([candidateId]);

-- AddForeignKey
ALTER TABLE [dbo].[educations] ADD CONSTRAINT [educations_candidateId_fkey] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[candidates]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
