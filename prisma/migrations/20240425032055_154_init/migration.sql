BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[job_vacancy_ta] DROP CONSTRAINT [job_vacancy_ta_ta_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[job_vacancy_users] DROP CONSTRAINT [job_vacancy_users_user_id_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancies] ADD CONSTRAINT [job_vacancies_ta_id_fkey] FOREIGN KEY ([ta_id]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_ta] ADD CONSTRAINT [job_vacancy_ta_ta_id_fkey] FOREIGN KEY ([ta_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_users] ADD CONSTRAINT [job_vacancy_users_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
