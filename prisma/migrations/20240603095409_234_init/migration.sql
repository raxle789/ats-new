/*
  Warnings:

  - A unique constraint covering the columns `[interview_result_id]` on the table `interview_interviewers` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[categories] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [description] TEXT NOT NULL,
    [created_at] DATETIME CONSTRAINT [categories_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [categories_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[interview_status] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [created_at] DATETIME CONSTRAINT [interview_status_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [interview_status_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[interview_results] (
    [id] INT NOT NULL IDENTITY(1,1),
    [statusId] INT NOT NULL,
    [comment] TEXT,
    [created_at] DATETIME CONSTRAINT [interview_results_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [interview_results_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[interview_result_categories] (
    [interviewResultId] INT NOT NULL,
    [categoryId] INT NOT NULL,
    [score] INT NOT NULL,
    [comment] TEXT,
    CONSTRAINT [interview_result_categories_pkey] PRIMARY KEY CLUSTERED ([interviewResultId],[categoryId])
);

-- CreateIndex
ALTER TABLE [dbo].[interview_interviewers] ADD CONSTRAINT [interview_interviewers_interview_result_id_key] UNIQUE NONCLUSTERED ([interview_result_id]);

-- AddForeignKey
ALTER TABLE [dbo].[interview_interviewers] ADD CONSTRAINT [interview_interviewers_interview_result_id_fkey] FOREIGN KEY ([interview_result_id]) REFERENCES [dbo].[interview_results]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[interview_results] ADD CONSTRAINT [interview_results_statusId_fkey] FOREIGN KEY ([statusId]) REFERENCES [dbo].[interview_status]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[interview_result_categories] ADD CONSTRAINT [interview_result_categories_interviewResultId_fkey] FOREIGN KEY ([interviewResultId]) REFERENCES [dbo].[interview_results]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[interview_result_categories] ADD CONSTRAINT [interview_result_categories_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[categories]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
