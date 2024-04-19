BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[job_functions] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [created_at] DATETIME CONSTRAINT [job_functions_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [job_functions_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
