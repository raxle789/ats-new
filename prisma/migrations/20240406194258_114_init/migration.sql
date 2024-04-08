/*
  Warnings:

  - The primary key for the `efpk_job_vacancies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `efpk_id` on the `efpk_job_vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `efpk_id` on the `efpk_ta` table. All the data in the column will be lost.
  - You are about to drop the column `efpk_id` on the `efpk_ta_transactions` table. All the data in the column will be lost.
  - You are about to drop the `efpk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `efpk_initiator_informations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Phones` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[efpk_request_no]` on the table `efpk_ta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `efpk_request_no` to the `efpk_job_vacancies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `efpk_request_no` to the `efpk_ta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `efpk_request_no` to the `efpk_ta_transactions` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[efpk_initiator_informations] DROP CONSTRAINT [efpk_initiator_informations_efpk_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[efpk_initiator_informations] DROP CONSTRAINT [efpk_initiator_informations_user_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[efpk_job_vacancies] DROP CONSTRAINT [efpk_job_vacancies_efpk_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[efpk_ta] DROP CONSTRAINT [efpk_ta_efpk_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[efpk_ta_transactions] DROP CONSTRAINT [efpk_ta_transactions_efpk_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Phones] DROP CONSTRAINT [Phones_user_id_fkey];

-- DropIndex
ALTER TABLE [dbo].[efpk_ta] DROP CONSTRAINT [efpk_ta_efpk_id_key];

-- AlterTable
ALTER TABLE [dbo].[efpk_job_vacancies] DROP CONSTRAINT [efpk_job_vacancies_pkey];
ALTER TABLE [dbo].[efpk_job_vacancies] DROP COLUMN [efpk_id];
ALTER TABLE [dbo].[efpk_job_vacancies] ADD [efpk_request_no] NVARCHAR(255) NOT NULL;
ALTER TABLE [dbo].[efpk_job_vacancies] ADD CONSTRAINT efpk_job_vacancies_pkey PRIMARY KEY CLUSTERED ([efpk_request_no],[job_vacancy_id]);

-- AlterTable
ALTER TABLE [dbo].[efpk_ta] DROP COLUMN [efpk_id];
ALTER TABLE [dbo].[efpk_ta] ADD [efpk_request_no] NVARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[efpk_ta_transactions] DROP COLUMN [efpk_id];
ALTER TABLE [dbo].[efpk_ta_transactions] ADD [efpk_request_no] NVARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE [dbo].[efpk];

-- DropTable
DROP TABLE [dbo].[efpk_initiator_informations];

-- DropTable
DROP TABLE [dbo].[Phones];

-- CreateIndex
ALTER TABLE [dbo].[efpk_ta] ADD CONSTRAINT [efpk_ta_efpk_request_no_key] UNIQUE NONCLUSTERED ([efpk_request_no]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
