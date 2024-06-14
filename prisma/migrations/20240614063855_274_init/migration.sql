/*
  Warnings:

  - You are about to drop the `Regions` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[Regions];

-- CreateTable
CREATE TABLE [dbo].[regions] (
    [id] INT NOT NULL IDENTITY(1,1),
    [code] NVARCHAR(255),
    [name] NVARCHAR(510) NOT NULL,
    [alias] NVARCHAR(510),
    [is_show] BIT CONSTRAINT [regions_is_show_df] DEFAULT 0,
    [proint_id] INT,
    [created_at] DATETIME CONSTRAINT [regions_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [regions_pkey] PRIMARY KEY CLUSTERED ([id])
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
