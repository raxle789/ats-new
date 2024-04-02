/*
  Warnings:

  - The primary key for the `initiators` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `initiators` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[efpk_id]` on the table `initiators` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `efpk_id` to the `initiators` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `initiators` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[initiators] DROP CONSTRAINT [initiators_pkey];
ALTER TABLE [dbo].[initiators] DROP COLUMN [user_id];
ALTER TABLE [dbo].[initiators] ADD [id] INT NOT NULL IDENTITY(1,1);
ALTER TABLE [dbo].[initiators] ADD CONSTRAINT initiators_pkey PRIMARY KEY CLUSTERED ([id]);
ALTER TABLE [dbo].[initiators] ADD [efpk_id] INT NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[initiators] ADD CONSTRAINT [initiators_efpk_id_key] UNIQUE NONCLUSTERED ([efpk_id]);

-- AddForeignKey
ALTER TABLE [dbo].[initiators] ADD CONSTRAINT [initiators_efpk_id_fkey] FOREIGN KEY ([efpk_id]) REFERENCES [dbo].[efpk]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
