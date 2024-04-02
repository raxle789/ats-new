/*
  Warnings:

  - You are about to alter the column `id` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `user_id` on the `initiators` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - Made the column `updated_at` on table `roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `initiators` required. This step will fail if there are existing NULL values in that column.

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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'roles'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_roles] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(255) NOT NULL,
    [guard] NVARCHAR(255) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [roles_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL,
    CONSTRAINT [roles_pkey] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_roles] ON;
IF EXISTS(SELECT * FROM [dbo].[roles])
    EXEC('INSERT INTO [dbo].[_prisma_new_roles] ([created_at],[guard],[id],[name],[updated_at]) SELECT [created_at],[guard],[id],[name],[updated_at] FROM [dbo].[roles] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_roles] OFF;
DROP TABLE [dbo].[roles];
EXEC SP_RENAME N'dbo._prisma_new_roles', N'roles';
DECLARE @SQL2 NVARCHAR(MAX) = N''
SELECT @SQL2 += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'initiators'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL2
;
CREATE TABLE [dbo].[_prisma_new_initiators] (
    [user_id] INT NOT NULL IDENTITY(1,1),
    [nik] NVARCHAR(510),
    [name] NVARCHAR(510),
    [email] NVARCHAR(510),
    [phone] NVARCHAR(510),
    [position] NVARCHAR(510),
    CONSTRAINT [initiators_pkey] PRIMARY KEY CLUSTERED ([user_id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_initiators] ON;
IF EXISTS(SELECT * FROM [dbo].[initiators])
    EXEC('INSERT INTO [dbo].[_prisma_new_initiators] ([email],[name],[nik],[phone],[position],[user_id]) SELECT [email],[name],[nik],[phone],[position],[user_id] FROM [dbo].[initiators] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_initiators] OFF;
DROP TABLE [dbo].[initiators];
EXEC SP_RENAME N'dbo._prisma_new_initiators', N'initiators';
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
