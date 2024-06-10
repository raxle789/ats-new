/*
  Warnings:

  - You are about to drop the column `avatarId` on the `identity_info` table. All the data in the column will be lost.
  - You are about to drop the column `kk_number` on the `identity_info` table. All the data in the column will be lost.
  - You are about to drop the column `ktpPhotoId` on the `identity_info` table. All the data in the column will be lost.
  - You are about to drop the column `ktp_number` on the `identity_info` table. All the data in the column will be lost.
  - You are about to drop the column `npwp_number` on the `identity_info` table. All the data in the column will be lost.
  - You are about to drop the column `passport_number` on the `identity_info` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[identity_info] DROP CONSTRAINT [FK_3c87e74de6f99d1c06cf4581fbb];

-- DropForeignKey
ALTER TABLE [dbo].[identity_info] DROP CONSTRAINT [FK_ff510b911992a2917ebdd7fb88a];

-- AlterTable
ALTER TABLE [dbo].[identity_info] DROP COLUMN [avatarId],
[kk_number],
[ktpPhotoId],
[ktp_number],
[npwp_number],
[passport_number];
ALTER TABLE [dbo].[identity_info] ADD [bank_account] NVARCHAR(32),
[family_number] NVARCHAR(16),
[id_card_number] NVARCHAR(32),
[tax_number] NVARCHAR(32);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
