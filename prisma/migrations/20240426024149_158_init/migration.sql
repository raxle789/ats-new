/*
  Warnings:

  - You are about to drop the column `birthCityId` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `domicileId` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `gender_id` on the `families` table. All the data in the column will be lost.
  - You are about to drop the `citys` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gender` to the `families` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_45d141f5577c4588067ed62ba75];

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_8f15bc1632f7f52ca9821727621];

-- DropForeignKey
ALTER TABLE [dbo].[families] DROP CONSTRAINT [families_gender_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[candidates] DROP COLUMN [birthCityId],
[domicileId];
ALTER TABLE [dbo].[candidates] ADD [birthCity] NVARCHAR(510),
[domicile] NVARCHAR(510);

-- AlterTable
ALTER TABLE [dbo].[families] DROP COLUMN [gender_id];
ALTER TABLE [dbo].[families] ADD [gender] NVARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE [dbo].[citys];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
