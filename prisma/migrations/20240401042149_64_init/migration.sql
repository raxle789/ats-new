/*
  Warnings:

  - You are about to drop the `efpk_ta_transaction` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[efpk_ta_transaction] DROP CONSTRAINT [efpk_ta_transaction_efpk_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[efpk_ta_transaction] DROP CONSTRAINT [efpk_ta_transaction_ta_id_fkey];

-- DropTable
DROP TABLE [dbo].[efpk_ta_transaction];

-- CreateTable
CREATE TABLE [dbo].[efpk_ta_transactions] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ta_id] INT NOT NULL,
    [efpk_id] INT NOT NULL,
    [assigned_at] DATETIME NOT NULL CONSTRAINT [efpk_ta_transactions_assigned_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [efpk_ta_transactions_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[efpk_ta_transactions] ADD CONSTRAINT [efpk_ta_transactions_ta_id_fkey] FOREIGN KEY ([ta_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[efpk_ta_transactions] ADD CONSTRAINT [efpk_ta_transactions_efpk_id_fkey] FOREIGN KEY ([efpk_id]) REFERENCES [dbo].[efpk]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
