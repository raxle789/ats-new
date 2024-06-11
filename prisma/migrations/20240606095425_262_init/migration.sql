/*
  Warnings:

  - The primary key for the `interview_result_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `interview_result_categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryName` to the `interview_result_categories` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[interview_result_categories] DROP CONSTRAINT [interview_result_categories_categoryId_fkey];

-- AlterTable
ALTER TABLE [dbo].[interview_result_categories] DROP CONSTRAINT [interview_result_categories_pkey];
ALTER TABLE [dbo].[interview_result_categories] DROP COLUMN [categoryId];
ALTER TABLE [dbo].[interview_result_categories] ADD [categoryName] NVARCHAR(510) NOT NULL;
ALTER TABLE [dbo].[interview_result_categories] ADD CONSTRAINT interview_result_categories_pkey PRIMARY KEY CLUSTERED ([interviewResultId],[categoryName]);

-- CreateIndex
ALTER TABLE [dbo].[categories] ADD CONSTRAINT [categories_name_key] UNIQUE NONCLUSTERED ([name]);

-- AddForeignKey
ALTER TABLE [dbo].[interview_result_categories] ADD CONSTRAINT [interview_result_categories_categoryName_fkey] FOREIGN KEY ([categoryName]) REFERENCES [dbo].[categories]([name]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
