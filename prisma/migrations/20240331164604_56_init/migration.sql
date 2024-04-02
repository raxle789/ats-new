/*
  Warnings:

  - You are about to drop the `initiators` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[initiators] DROP CONSTRAINT [initiators_efpk_id_fkey];

-- DropTable
DROP TABLE [dbo].[initiators];

-- CreateTable
CREATE TABLE [dbo].[efpk_initiator_informations] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nik] NVARCHAR(510),
    [name] NVARCHAR(510),
    [email] NVARCHAR(510),
    [phone] NVARCHAR(510),
    [position] NVARCHAR(510),
    [efpk_id] INT NOT NULL,
    CONSTRAINT [efpk_initiator_informations_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [efpk_initiator_informations_efpk_id_key] UNIQUE NONCLUSTERED ([efpk_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[efpk_initiator_informations] ADD CONSTRAINT [efpk_initiator_informations_efpk_id_fkey] FOREIGN KEY ([efpk_id]) REFERENCES [dbo].[efpk]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
