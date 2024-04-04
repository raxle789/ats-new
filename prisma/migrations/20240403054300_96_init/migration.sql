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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'educations'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_educations] (
    [id] INT NOT NULL IDENTITY(1,1),
    [start_year] SMALLINT NOT NULL,
    [end_year] SMALLINT NOT NULL,
    [university_name] NVARCHAR(256) NOT NULL,
    [major] NVARCHAR(128) NOT NULL,
    [gpa] FLOAT(53) NOT NULL,
    [language] NVARCHAR(64) NOT NULL,
    [is_latest] BIT NOT NULL,
    [is_graduate] BIT NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_9476acc97bf108991353a9af4b0] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME CONSTRAINT [DF_11046a6c8f5e17e459700cc9a13] DEFAULT CURRENT_TIMESTAMP,
    [candidateId] INT NOT NULL,
    CONSTRAINT [PK_09d2f29e7f6f31f5c01d79d2dbf] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_educations] ON;
IF EXISTS(SELECT * FROM [dbo].[educations])
    EXEC('INSERT INTO [dbo].[_prisma_new_educations] ([candidateId],[created_at],[end_year],[gpa],[id],[is_graduate],[is_latest],[language],[major],[start_year],[university_name],[updated_at]) SELECT [candidateId],[created_at],[end_year],[gpa],[id],[is_graduate],[is_latest],[language],[major],[start_year],[university_name],[updated_at] FROM [dbo].[educations] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_educations] OFF;
DROP TABLE [dbo].[educations];
EXEC SP_RENAME N'dbo._prisma_new_educations', N'educations';
DECLARE @SQL2 NVARCHAR(MAX) = N''
SELECT @SQL2 += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'working_experiences'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL2
;
CREATE TABLE [dbo].[_prisma_new_working_experiences] (
    [id] INT NOT NULL IDENTITY(1,1),
    [company_name] NVARCHAR(256) NOT NULL,
    [line_industry] NVARCHAR(128) NOT NULL,
    [job_title] NVARCHAR(128) NOT NULL,
    [job_level] NVARCHAR(64),
    [job_function] NVARCHAR(256) NOT NULL,
    [job_description] NVARCHAR(512) NOT NULL,
    [salary] INT NOT NULL,
    [start_at] DATE NOT NULL,
    [end_at] DATE NOT NULL,
    [is_currently] BIT NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_6aad921dfbb2e334f6a9fdd823b] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME CONSTRAINT [DF_54053863149a7090457b86a587c] DEFAULT CURRENT_TIMESTAMP,
    [candidateId] INT NOT NULL,
    CONSTRAINT [PK_7ef8ca191515c6b51c75d5390d0] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_working_experiences] ON;
IF EXISTS(SELECT * FROM [dbo].[working_experiences])
    EXEC('INSERT INTO [dbo].[_prisma_new_working_experiences] ([candidateId],[company_name],[created_at],[end_at],[id],[is_currently],[job_description],[job_function],[job_level],[job_title],[line_industry],[salary],[start_at],[updated_at]) SELECT [candidateId],[company_name],[created_at],[end_at],[id],[is_currently],[job_description],[job_function],[job_level],[job_title],[line_industry],[salary],[start_at],[updated_at] FROM [dbo].[working_experiences] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_working_experiences] OFF;
DROP TABLE [dbo].[working_experiences];
EXEC SP_RENAME N'dbo._prisma_new_working_experiences', N'working_experiences';
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
