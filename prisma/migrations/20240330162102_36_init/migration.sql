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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'education_levels'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_education_levels] (
    [id] INT NOT NULL,
    [name] NVARCHAR(510) NOT NULL,
    [proint_id] INT NOT NULL,
    [created_at] DATETIME CONSTRAINT [education_levels_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [education_levels_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[education_levels])
    EXEC('INSERT INTO [dbo].[_prisma_new_education_levels] ([created_at],[id],[name],[proint_id],[updated_at]) SELECT [created_at],[id],[name],[proint_id],[updated_at] FROM [dbo].[education_levels] WITH (holdlock tablockx)');
DROP TABLE [dbo].[education_levels];
EXEC SP_RENAME N'dbo._prisma_new_education_levels', N'education_levels';
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
