BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[user_has_roles] (
    [role_id] INT NOT NULL,
    [user_id] INT NOT NULL,
    CONSTRAINT [user_has_roles_pkey] PRIMARY KEY CLUSTERED ([role_id],[user_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[user_has_roles] ADD CONSTRAINT [user_has_roles_role_id_fkey] FOREIGN KEY ([role_id]) REFERENCES [dbo].[roles]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

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
