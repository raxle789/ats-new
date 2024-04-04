BEGIN TRY

BEGIN TRAN;

-- AddForeignKey
ALTER TABLE [dbo].[certifications] ADD CONSTRAINT [FK_309f34896c518983111ebeca641] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[documents] ADD CONSTRAINT [FK_6c6b9775baa0c8973bd829a8e46] FOREIGN KEY ([documentTypeId]) REFERENCES [dbo].[document_types]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[documents] ADD CONSTRAINT [documents_candidate_id_fkey] FOREIGN KEY ([candidate_id]) REFERENCES [dbo].[candidates]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[familys] ADD CONSTRAINT [FK_4122f645771e9e2938abfd8c0c5] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[identity_info] ADD CONSTRAINT [FK_3c87e74de6f99d1c06cf4581fbb] FOREIGN KEY ([ktpPhotoId]) REFERENCES [dbo].[documents]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[identity_info] ADD CONSTRAINT [FK_ff510b911992a2917ebdd7fb88a] FOREIGN KEY ([avatarId]) REFERENCES [dbo].[documents]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[sims] ADD CONSTRAINT [FK_c07d287b265501fffa4b4559984] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[sims] ADD CONSTRAINT [FK_e18f71ccc446f3c09584647d100] FOREIGN KEY ([simPhotoIdId]) REFERENCES [dbo].[documents]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
