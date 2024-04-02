/*
  Warnings:

  - You are about to drop the `efpk_job_postings` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[efpk_job_postings] DROP CONSTRAINT [efpk_job_postings_efpk_id_fkey];

-- DropTable
DROP TABLE [dbo].[efpk_job_postings];

-- CreateTable
CREATE TABLE [dbo].[efpk_job_vacancies] (
    [id] INT NOT NULL IDENTITY(1,1),
    [status] NVARCHAR(20) NOT NULL,
    [efpk_id] INT NOT NULL,
    CONSTRAINT [efpk_job_vacancies_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [efpk_job_vacancies_efpk_id_key] UNIQUE NONCLUSTERED ([efpk_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[efpk_job_vacancies] ADD CONSTRAINT [efpk_job_vacancies_efpk_id_fkey] FOREIGN KEY ([efpk_id]) REFERENCES [dbo].[efpk]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
