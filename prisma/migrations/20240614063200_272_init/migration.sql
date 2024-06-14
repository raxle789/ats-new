BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Regions] (
    [id] INT NOT NULL IDENTITY(1,1),
    [proint_id] INT,
    [code] NVARCHAR(255),
    [name] NVARCHAR(510) NOT NULL,
    [alias] NVARCHAR(510),
    [created_at] DATETIME CONSTRAINT [Regions_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [Regions_pkey] PRIMARY KEY CLUSTERED ([id])
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
