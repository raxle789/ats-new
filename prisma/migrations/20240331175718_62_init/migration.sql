BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[efpk_initiator_informations] DROP CONSTRAINT [efpk_initiator_informations_user_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[efpk_initiator_informations] ALTER COLUMN [user_id] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[efpk_initiator_informations] ADD CONSTRAINT [efpk_initiator_informations_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
