BEGIN TRY

BEGIN TRAN;

-- RedefineTables
BEGIN TRANSACTION;
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'line_industries'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_line_industries] (
    [id] INT NOT NULL,
    [name] NVARCHAR(510) NOT NULL,
    [created_at] DATETIME CONSTRAINT [line_industries_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [line_industries_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[line_industries])
    EXEC('INSERT INTO [dbo].[_prisma_new_line_industries] ([created_at],[id],[name],[updated_at]) SELECT [created_at],[id],[name],[updated_at] FROM [dbo].[line_industries] WITH (holdlock tablockx)');
DROP TABLE [dbo].[line_industries];
EXEC SP_RENAME N'dbo._prisma_new_line_industries', N'line_industries';
COMMIT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
