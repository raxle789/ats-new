BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[candidate_states] DROP CONSTRAINT [candidate_states_candidate_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[candidate_states] DROP CONSTRAINT [candidate_states_job_vacancy_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[candidate_states] DROP CONSTRAINT [candidate_states_state_name_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[job_vacancy_line_industries] DROP CONSTRAINT [job_vacancy_line_industries_job_vacancy_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[job_vacancy_line_industries] DROP CONSTRAINT [job_vacancy_line_industries_line_industry_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[job_vacancy_requirements] DROP CONSTRAINT [job_vacancy_requirements_job_vacancy_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[job_vacancy_requirements] DROP CONSTRAINT [job_vacancy_requirements_requirement_field_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[job_vacancy_ta] DROP CONSTRAINT [job_vacancy_ta_job_vacancy_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[job_vacancy_users] DROP CONSTRAINT [job_vacancy_users_job_vacancy_id_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_requirements] ADD CONSTRAINT [job_vacancy_requirements_job_vacancy_id_fkey] FOREIGN KEY ([job_vacancy_id]) REFERENCES [dbo].[job_vacancies]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_requirements] ADD CONSTRAINT [job_vacancy_requirements_requirement_field_id_fkey] FOREIGN KEY ([requirement_field_id]) REFERENCES [dbo].[requirement_fields]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[candidate_states] ADD CONSTRAINT [candidate_states_candidate_id_fkey] FOREIGN KEY ([candidate_id]) REFERENCES [dbo].[candidates]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[candidate_states] ADD CONSTRAINT [candidate_states_job_vacancy_id_fkey] FOREIGN KEY ([job_vacancy_id]) REFERENCES [dbo].[job_vacancies]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[candidate_states] ADD CONSTRAINT [candidate_states_state_name_fkey] FOREIGN KEY ([state_name]) REFERENCES [dbo].[states]([name]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_line_industries] ADD CONSTRAINT [job_vacancy_line_industries_job_vacancy_id_fkey] FOREIGN KEY ([job_vacancy_id]) REFERENCES [dbo].[job_vacancies]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_line_industries] ADD CONSTRAINT [job_vacancy_line_industries_line_industry_id_fkey] FOREIGN KEY ([line_industry_id]) REFERENCES [dbo].[line_industries]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_ta] ADD CONSTRAINT [job_vacancy_ta_job_vacancy_id_fkey] FOREIGN KEY ([job_vacancy_id]) REFERENCES [dbo].[job_vacancies]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_users] ADD CONSTRAINT [job_vacancy_users_job_vacancy_id_fkey] FOREIGN KEY ([job_vacancy_id]) REFERENCES [dbo].[job_vacancies]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
