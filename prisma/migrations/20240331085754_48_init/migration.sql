/*
  Warnings:

  - You are about to alter the column `id` on the `phones` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.

*/
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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'phones'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_phones] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [type] NVARCHAR(510),
    [number] NVARCHAR(510),
    [status] NVARCHAR(510),
    [current] INT,
    [created_at] DATETIME CONSTRAINT [phones_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [phones_pkey] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_phones] ON;
IF EXISTS(SELECT * FROM [dbo].[phones])
    EXEC('INSERT INTO [dbo].[_prisma_new_phones] ([created_at],[current],[id],[number],[status],[type],[updated_at],[user_id]) SELECT [created_at],[current],[id],[number],[status],[type],[updated_at],[user_id] FROM [dbo].[phones] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_phones] OFF;
DROP TABLE [dbo].[phones];
EXEC SP_RENAME N'dbo._prisma_new_phones', N'phones';
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
