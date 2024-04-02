BEGIN TRY

BEGIN TRAN;

-- RenameForeignKey
EXEC sp_rename 'dbo.position_level_requirements_requirement_level_id_fkey', 'position_level_requirements_requirement_field_id_fkey', 'OBJECT';

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
