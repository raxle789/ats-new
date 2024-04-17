BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[requirement_fields] ADD [requirement_field_parser_id] INT;

-- CreateTable
CREATE TABLE [dbo].[requirement_field_parsers] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(510) NOT NULL,
    [created_at] DATETIME CONSTRAINT [requirement_field_parsers_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [requirement_field_parsers_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [requirement_field_parsers_name_key] UNIQUE NONCLUSTERED ([name])
);

-- AddForeignKey
ALTER TABLE [dbo].[requirement_fields] ADD CONSTRAINT [requirement_fields_requirement_field_parser_id_fkey] FOREIGN KEY ([requirement_field_parser_id]) REFERENCES [dbo].[requirement_field_parsers]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
