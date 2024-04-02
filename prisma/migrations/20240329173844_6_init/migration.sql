/*
  Warnings:

  - The primary key for the `efpk` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `efpk_request_no` on the `efpk_ta` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[efpk_id]` on the table `efpk_ta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `efpk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `efpk_id` to the `efpk_ta` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[efpk_ta] DROP CONSTRAINT [efpk_ta_efpk_request_no_fkey];

-- DropIndex
ALTER TABLE [dbo].[efpk_ta] DROP CONSTRAINT [efpk_ta_efpk_request_no_key];

-- AlterTable
ALTER TABLE [dbo].[efpk] DROP CONSTRAINT [efpk_pkey];
ALTER TABLE [dbo].[efpk] ADD [id] INT NOT NULL IDENTITY(1,1);
ALTER TABLE [dbo].[efpk] ADD CONSTRAINT efpk_pkey PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[efpk_ta] DROP COLUMN [efpk_request_no];
ALTER TABLE [dbo].[efpk_ta] ADD [efpk_id] INT NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[efpk_ta] ADD CONSTRAINT [efpk_ta_efpk_id_key] UNIQUE NONCLUSTERED ([efpk_id]);

-- AddForeignKey
ALTER TABLE [dbo].[efpk_ta] ADD CONSTRAINT [efpk_ta_efpk_id_fkey] FOREIGN KEY ([efpk_id]) REFERENCES [dbo].[efpk]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
