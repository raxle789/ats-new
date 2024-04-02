/*
  Warnings:

  - Added the required column `user_id` to the `efpk_initiator_informations` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[efpk_initiator_informations] ADD [user_id] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[efpk_initiator_informations] ADD CONSTRAINT [efpk_initiator_informations_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
