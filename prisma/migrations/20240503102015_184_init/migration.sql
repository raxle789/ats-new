BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[efpk_job_vacancies] DROP CONSTRAINT [efpk_job_vacancies_job_vacancy_id_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[efpk_job_vacancies] ADD CONSTRAINT [efpk_job_vacancies_job_vacancy_id_fkey] FOREIGN KEY ([job_vacancy_id]) REFERENCES [dbo].[job_vacancies]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
