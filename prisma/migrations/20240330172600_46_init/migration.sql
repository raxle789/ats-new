/*
  Warnings:

  - You are about to drop the column `efpk_ta_id` on the `efpk_ta_transaction` table. All the data in the column will be lost.
  - Added the required column `efpk_id` to the `efpk_ta_transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ta_id` to the `efpk_ta_transaction` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[efpk_ta_transaction] DROP CONSTRAINT [efpk_ta_transaction_efpk_ta_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[efpk_ta_transaction] DROP COLUMN [efpk_ta_id];
ALTER TABLE [dbo].[efpk_ta_transaction] ADD [efpk_id] INT NOT NULL,
[ta_id] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[efpk_ta_transaction] ADD CONSTRAINT [efpk_ta_transaction_ta_id_fkey] FOREIGN KEY ([ta_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[efpk_ta_transaction] ADD CONSTRAINT [efpk_ta_transaction_efpk_id_fkey] FOREIGN KEY ([efpk_id]) REFERENCES [dbo].[efpk]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
