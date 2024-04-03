BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_02cb34982ecd17fda09c240254e];

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_45d141f5577c4588067ed62ba75];

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_4942769253874bef2bc42d1858d];

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_8f15bc1632f7f52ca9821727621];

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_a53ea01ce0f52efa194dbb49f39];

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_bbd440878ce26abdc91d67a0af8];

-- DropForeignKey
ALTER TABLE [dbo].[sims] DROP CONSTRAINT [FK_e18f71ccc446f3c09584647d100];

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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'addresses'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_addresses] (
    [id] INT NOT NULL IDENTITY(1,1),
    [street_address] NVARCHAR(256) NOT NULL,
    [city] NVARCHAR(128) NOT NULL,
    [province] NVARCHAR(256) NOT NULL,
    [postal_code] INT NOT NULL,
    [country] NVARCHAR(255) NOT NULL CONSTRAINT [DF_35936c20d74117b96ca37c06dbf] DEFAULT 'Indonesia',
    CONSTRAINT [PK_745d8f43d3af10ab8247465e450] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_addresses] ON;
IF EXISTS(SELECT * FROM [dbo].[addresses])
    EXEC('INSERT INTO [dbo].[_prisma_new_addresses] ([city],[country],[id],[postal_code],[province],[street_address]) SELECT [city],[country],[id],[postal_code],[province],[street_address] FROM [dbo].[addresses] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_addresses] OFF;
DROP TABLE [dbo].[addresses];
EXEC SP_RENAME N'dbo._prisma_new_addresses', N'addresses';
DECLARE @SQL2 NVARCHAR(MAX) = N''
SELECT @SQL2 += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'certifications'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL2
;
CREATE TABLE [dbo].[_prisma_new_certifications] (
    [id] INT NOT NULL IDENTITY(1,1),
    [certification_name] NVARCHAR(256) NOT NULL,
    [url] NVARCHAR(512) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_b4df756126a0a63ec5d1dcbb79c] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME CONSTRAINT [DF_804840a17448cc76bd307be181c] DEFAULT CURRENT_TIMESTAMP,
    [candidateId] INT NOT NULL,
    CONSTRAINT [PK_fd763d412e4a1fb1b6dadd6e72b] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_certifications] ON;
IF EXISTS(SELECT * FROM [dbo].[certifications])
    EXEC('INSERT INTO [dbo].[_prisma_new_certifications] ([candidateId],[certification_name],[created_at],[id],[updated_at],[url]) SELECT [candidateId],[certification_name],[created_at],[id],[updated_at],[url] FROM [dbo].[certifications] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_certifications] OFF;
DROP TABLE [dbo].[certifications];
EXEC SP_RENAME N'dbo._prisma_new_certifications', N'certifications';
DECLARE @SQL3 NVARCHAR(MAX) = N''
SELECT @SQL3 += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'citys'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL3
;
CREATE TABLE [dbo].[_prisma_new_citys] (
    [id] INT NOT NULL IDENTITY(1,1),
    [city_name] NVARCHAR(256) NOT NULL,
    CONSTRAINT [PK_601fc3e41ea83d443260e75334b] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_citys] ON;
IF EXISTS(SELECT * FROM [dbo].[citys])
    EXEC('INSERT INTO [dbo].[_prisma_new_citys] ([city_name],[id]) SELECT [city_name],[id] FROM [dbo].[citys] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_citys] OFF;
DROP TABLE [dbo].[citys];
EXEC SP_RENAME N'dbo._prisma_new_citys', N'citys';
DECLARE @SQL4 NVARCHAR(MAX) = N''
SELECT @SQL4 += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'candidates_diseases'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL4
;
CREATE TABLE [dbo].[_prisma_new_candidates_diseases] (
    [id] INT NOT NULL IDENTITY(1,1),
    [disease_name] NVARCHAR(126) NOT NULL,
    [diagnosis_date] DATE NOT NULL,
    CONSTRAINT [PK_98de0fe4d1c3d848b42d6fc5eab] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_candidates_diseases] ON;
IF EXISTS(SELECT * FROM [dbo].[candidates_diseases])
    EXEC('INSERT INTO [dbo].[_prisma_new_candidates_diseases] ([diagnosis_date],[disease_name],[id]) SELECT [diagnosis_date],[disease_name],[id] FROM [dbo].[candidates_diseases] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_candidates_diseases] OFF;
DROP TABLE [dbo].[candidates_diseases];
EXEC SP_RENAME N'dbo._prisma_new_candidates_diseases', N'candidates_diseases';
DECLARE @SQL5 NVARCHAR(MAX) = N''
SELECT @SQL5 += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'emergency_contacts'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL5
;
CREATE TABLE [dbo].[_prisma_new_emergency_contacts] (
    [id] INT NOT NULL IDENTITY(1,1),
    [contact_name] NVARCHAR(126) NOT NULL,
    [phone_number] NVARCHAR(16) NOT NULL,
    CONSTRAINT [PK_8be191845b6fca1c4e5ba5bd7d1] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_emergency_contacts] ON;
IF EXISTS(SELECT * FROM [dbo].[emergency_contacts])
    EXEC('INSERT INTO [dbo].[_prisma_new_emergency_contacts] ([contact_name],[id],[phone_number]) SELECT [contact_name],[id],[phone_number] FROM [dbo].[emergency_contacts] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_emergency_contacts] OFF;
DROP TABLE [dbo].[emergency_contacts];
EXEC SP_RENAME N'dbo._prisma_new_emergency_contacts', N'emergency_contacts';
DECLARE @SQL6 NVARCHAR(MAX) = N''
SELECT @SQL6 += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'skill_types'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL6
;
CREATE TABLE [dbo].[_prisma_new_skill_types] (
    [id] INT NOT NULL IDENTITY(1,1),
    [skill_name] NVARCHAR(126) NOT NULL,
    CONSTRAINT [PK_f98a760e950fc2f7376178e0689] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_skill_types] ON;
IF EXISTS(SELECT * FROM [dbo].[skill_types])
    EXEC('INSERT INTO [dbo].[_prisma_new_skill_types] ([id],[skill_name]) SELECT [id],[skill_name] FROM [dbo].[skill_types] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_skill_types] OFF;
DROP TABLE [dbo].[skill_types];
EXEC SP_RENAME N'dbo._prisma_new_skill_types', N'skill_types';
ALTER TABLE [dbo].[banks] DROP CONSTRAINT [UQ_d99ff7685a1d8bc7f203451f196];
DECLARE @SQL7 NVARCHAR(MAX) = N''
SELECT @SQL7 += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'banks'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL7
;
CREATE TABLE [dbo].[_prisma_new_banks] (
    [id] INT NOT NULL IDENTITY(1,1),
    [bank_name] NVARCHAR(64) NOT NULL,
    [bank_branch] NVARCHAR(64) NOT NULL,
    [bank_account_number] INT NOT NULL,
    CONSTRAINT [PK_3975b5f684ec241e3901db62d77] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_d99ff7685a1d8bc7f203451f196] UNIQUE NONCLUSTERED ([bank_account_number])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_banks] ON;
IF EXISTS(SELECT * FROM [dbo].[banks])
    EXEC('INSERT INTO [dbo].[_prisma_new_banks] ([bank_account_number],[bank_branch],[bank_name],[id]) SELECT [bank_account_number],[bank_branch],[bank_name],[id] FROM [dbo].[banks] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_banks] OFF;
DROP TABLE [dbo].[banks];
EXEC SP_RENAME N'dbo._prisma_new_banks', N'banks';
DECLARE @SQL8 NVARCHAR(MAX) = N''
SELECT @SQL8 += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'identity_info'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL8
;
CREATE TABLE [dbo].[_prisma_new_identity_info] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ktp_number] NVARCHAR(16) NOT NULL,
    [kk_number] NVARCHAR(16) NOT NULL,
    [passport_number] NVARCHAR(32) NOT NULL,
    [npwp_number] NVARCHAR(9),
    [avatarId] INT,
    [ktpPhotoId] INT,
    CONSTRAINT [PK_1b708b2de550b69816a56e68f11] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_identity_info] ON;
IF EXISTS(SELECT * FROM [dbo].[identity_info])
    EXEC('INSERT INTO [dbo].[_prisma_new_identity_info] ([avatarId],[id],[kk_number],[ktpPhotoId],[ktp_number],[npwp_number],[passport_number]) SELECT [avatarId],[id],[kk_number],[ktpPhotoId],[ktp_number],[npwp_number],[passport_number] FROM [dbo].[identity_info] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_identity_info] OFF;
DROP TABLE [dbo].[identity_info];
EXEC SP_RENAME N'dbo._prisma_new_identity_info', N'identity_info';
DECLARE @SQL9 NVARCHAR(MAX) = N''
SELECT @SQL9 += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'familys'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL9
;
CREATE TABLE [dbo].[_prisma_new_familys] (
    [id] INT NOT NULL IDENTITY(1,1),
    [type] NVARCHAR(64) NOT NULL,
    [relationship] NVARCHAR(128) NOT NULL,
    [name] NVARCHAR(256) NOT NULL,
    [gender] NVARCHAR(64) NOT NULL,
    [date_of_birth] DATE NOT NULL,
    [last_education] NVARCHAR(256) NOT NULL,
    [work_position] NVARCHAR(128) NOT NULL,
    [ktp_number] NVARCHAR(16) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_1a00d630ca8885eacba9221a8ce] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME CONSTRAINT [DF_f1faf26b99d8655dbe4a1d7b7ac] DEFAULT CURRENT_TIMESTAMP,
    [candidateId] INT,
    CONSTRAINT [PK_347a8e3fa04d0a5013ed082fe97] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_familys] ON;
IF EXISTS(SELECT * FROM [dbo].[familys])
    EXEC('INSERT INTO [dbo].[_prisma_new_familys] ([candidateId],[created_at],[date_of_birth],[gender],[id],[ktp_number],[last_education],[name],[relationship],[type],[updated_at],[work_position]) SELECT [candidateId],[created_at],[date_of_birth],[gender],[id],[ktp_number],[last_education],[name],[relationship],[type],[updated_at],[work_position] FROM [dbo].[familys] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_familys] OFF;
DROP TABLE [dbo].[familys];
EXEC SP_RENAME N'dbo._prisma_new_familys', N'familys';
DECLARE @SQL10 NVARCHAR(MAX) = N''
SELECT @SQL10 += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'documents'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL10
;
CREATE TABLE [dbo].[_prisma_new_documents] (
    [id] INT NOT NULL IDENTITY(1,1),
    [saved_name] NVARCHAR(128) NOT NULL,
    [original_name] NVARCHAR(128) NOT NULL,
    [byte_size] INT NOT NULL,
    [path] NVARCHAR(255) NOT NULL,
    [file_base] VARBINARY(1) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_0ac6db0be1ba323e80e653b0e6d] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [DF_0fa0f20571d78848ea6e36f75b5] DEFAULT CURRENT_TIMESTAMP,
    [documentTypeId] INT,
    [candidate_id] INT,
    CONSTRAINT [PK_ac51aa5181ee2036f5ca482857c] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_documents] ON;
IF EXISTS(SELECT * FROM [dbo].[documents])
    EXEC('INSERT INTO [dbo].[_prisma_new_documents] ([byte_size],[candidate_id],[created_at],[documentTypeId],[file_base],[id],[original_name],[path],[saved_name],[updated_at]) SELECT [byte_size],[candidate_id],[created_at],[documentTypeId],[file_base],[id],[original_name],[path],[saved_name],[updated_at] FROM [dbo].[documents] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_documents] OFF;
DROP TABLE [dbo].[documents];
EXEC SP_RENAME N'dbo._prisma_new_documents', N'documents';
DECLARE @SQL11 NVARCHAR(MAX) = N''
SELECT @SQL11 += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'sims'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL11
;
CREATE TABLE [dbo].[_prisma_new_sims] (
    [id] INT NOT NULL IDENTITY(1,1),
    [sim_type] NVARCHAR(64) NOT NULL,
    [sim_number] NVARCHAR(128) NOT NULL,
    [simPhotoIdId] INT,
    [candidateId] INT,
    CONSTRAINT [PK_65e3dc2c5d993ede14fdf9df1ea] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_sims] ON;
IF EXISTS(SELECT * FROM [dbo].[sims])
    EXEC('INSERT INTO [dbo].[_prisma_new_sims] ([candidateId],[id],[simPhotoIdId],[sim_number],[sim_type]) SELECT [candidateId],[id],[simPhotoIdId],[sim_number],[sim_type] FROM [dbo].[sims] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_sims] OFF;
DROP TABLE [dbo].[sims];
EXEC SP_RENAME N'dbo._prisma_new_sims', N'sims';
DECLARE @SQL12 NVARCHAR(MAX) = N''
SELECT @SQL12 += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'document_types'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL12
;
CREATE TABLE [dbo].[_prisma_new_document_types] (
    [id] INT NOT NULL IDENTITY(1,1),
    [document_name] NVARCHAR(128) NOT NULL,
    CONSTRAINT [PK_d467d7eeb7c8ce216e90e8494aa] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_document_types] ON;
IF EXISTS(SELECT * FROM [dbo].[document_types])
    EXEC('INSERT INTO [dbo].[_prisma_new_document_types] ([document_name],[id]) SELECT [document_name],[id] FROM [dbo].[document_types] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_document_types] OFF;
DROP TABLE [dbo].[document_types];
EXEC SP_RENAME N'dbo._prisma_new_document_types', N'document_types';
DECLARE @SQL13 NVARCHAR(MAX) = N''
SELECT @SQL13 += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'example_3'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL13
;
CREATE TABLE [dbo].[_prisma_new_example_3] (
    [id] INT NOT NULL IDENTITY(1,1),
    [publisher] NVARCHAR(64) NOT NULL,
    CONSTRAINT [PK_3bb2908fae9cb6594c29312c3ac] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_example_3] ON;
IF EXISTS(SELECT * FROM [dbo].[example_3])
    EXEC('INSERT INTO [dbo].[_prisma_new_example_3] ([id],[publisher]) SELECT [id],[publisher] FROM [dbo].[example_3] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_example_3] OFF;
DROP TABLE [dbo].[example_3];
EXEC SP_RENAME N'dbo._prisma_new_example_3', N'example_3';
COMMIT;

-- AddForeignKey
ALTER TABLE [dbo].[candidates] ADD CONSTRAINT [FK_02cb34982ecd17fda09c240254e] FOREIGN KEY ([emengencyContactId]) REFERENCES [dbo].[emergency_contacts]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[candidates] ADD CONSTRAINT [FK_45d141f5577c4588067ed62ba75] FOREIGN KEY ([birthCityId]) REFERENCES [dbo].[citys]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[candidates] ADD CONSTRAINT [FK_4942769253874bef2bc42d1858d] FOREIGN KEY ([bankId]) REFERENCES [dbo].[banks]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[candidates] ADD CONSTRAINT [FK_8f15bc1632f7f52ca9821727621] FOREIGN KEY ([domicileId]) REFERENCES [dbo].[citys]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[candidates] ADD CONSTRAINT [FK_a53ea01ce0f52efa194dbb49f39] FOREIGN KEY ([addressId]) REFERENCES [dbo].[addresses]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[candidates] ADD CONSTRAINT [FK_bbd440878ce26abdc91d67a0af8] FOREIGN KEY ([identityInfoId]) REFERENCES [dbo].[identity_info]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
