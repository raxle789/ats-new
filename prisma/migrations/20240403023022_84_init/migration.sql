BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_10d0384a816526f8c7f6b1e67b3];

-- DropForeignKey
ALTER TABLE [dbo].[efpk_initiator_informations] DROP CONSTRAINT [efpk_initiator_informations_user_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[efpk_ta] DROP CONSTRAINT [efpk_ta_ta_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[efpk_ta_transactions] DROP CONSTRAINT [efpk_ta_transactions_ta_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[phones] DROP CONSTRAINT [phones_user_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[user_has_roles] DROP CONSTRAINT [user_has_roles_user_id_fkey];

-- RedefineTables
BEGIN TRANSACTION;
ALTER TABLE [dbo].[users] DROP CONSTRAINT [UQ_97672ac88f789774dd47f7c8be3];
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'users'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(256) NOT NULL,
    [email] NVARCHAR(128) NOT NULL,
    [is_email_verified] BIT,
    [password] NVARCHAR(512) NOT NULL,
    [created_at] DATETIME CONSTRAINT [DF_c9b5b525a96ddc2c5647d7f7fa5] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME CONSTRAINT [DF_6d596d799f9cb9dac6f7bf7c23c] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_a3ffb1c0c8416b9fc6f907b7433] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_97672ac88f789774dd47f7c8be3] UNIQUE NONCLUSTERED ([email])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_users] ON;
IF EXISTS(SELECT * FROM [dbo].[users])
    EXEC('INSERT INTO [dbo].[_prisma_new_users] ([created_at],[email],[id],[is_email_verified],[name],[password],[updated_at]) SELECT [created_at],[email],[id],[is_email_verified],[name],[password],[updated_at] FROM [dbo].[users] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_users] OFF;
DROP TABLE [dbo].[users];
EXEC SP_RENAME N'dbo._prisma_new_users', N'users';
COMMIT;

-- AddForeignKey
ALTER TABLE [dbo].[candidates] ADD CONSTRAINT [FK_10d0384a816526f8c7f6b1e67b3] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[efpk_ta] ADD CONSTRAINT [efpk_ta_ta_id_fkey] FOREIGN KEY ([ta_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[efpk_ta_transactions] ADD CONSTRAINT [efpk_ta_transactions_ta_id_fkey] FOREIGN KEY ([ta_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[efpk_initiator_informations] ADD CONSTRAINT [efpk_initiator_informations_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[phones] ADD CONSTRAINT [phones_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[user_has_roles] ADD CONSTRAINT [user_has_roles_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
