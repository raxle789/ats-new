/*
  Warnings:

  - The primary key for the `addresses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - You are about to alter the column `postal_code` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - The primary key for the `banks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `banks` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - You are about to alter the column `bank_account_number` on the `banks` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - The primary key for the `candidates_diseases` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `candidates_diseases` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - The primary key for the `certifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `certifications` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - You are about to alter the column `candidateId` on the `certifications` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - The primary key for the `citys` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `citys` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - The primary key for the `document_types` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `document_types` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - The primary key for the `documents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `documents` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - You are about to alter the column `byte_size` on the `documents` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - You are about to alter the column `documentTypeId` on the `documents` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - You are about to alter the column `candidate_id` on the `documents` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - The primary key for the `educations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `educations` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - You are about to alter the column `candidateId` on the `educations` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - The primary key for the `emergency_contacts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `emergency_contacts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - The primary key for the `example_3` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `example_3` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - The primary key for the `familys` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `familys` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - You are about to alter the column `candidateId` on the `familys` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - The primary key for the `identity_info` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `identity_info` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - You are about to alter the column `avatarId` on the `identity_info` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - You are about to alter the column `ktpPhotoId` on the `identity_info` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - The primary key for the `sims` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `sims` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - You are about to alter the column `simPhotoIdId` on the `sims` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - You are about to alter the column `candidateId` on the `sims` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - The primary key for the `skill_types` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `skill_types` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - The primary key for the `working_experiences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `working_experiences` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - You are about to alter the column `salary` on the `working_experiences` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - You are about to alter the column `candidateId` on the `working_experiences` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - The primary key for the `candidates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `addressId` on the `candidates` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `bankId` on the `candidates` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `birthCityId` on the `candidates` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `current_salary` on the `candidates` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `domicileId` on the `candidates` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `emengencyContactId` on the `candidates` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `id` on the `candidates` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `identityInfoId` on the `candidates` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[certifications] DROP CONSTRAINT [FK_309f34896c518983111ebeca641];

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_bbd440878ce26abdc91d67a0af8];

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_02cb34982ecd17fda09c240254e];

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_10d0384a816526f8c7f6b1e67b3];

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_45d141f5577c4588067ed62ba75];

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_8f15bc1632f7f52ca9821727621];

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_4942769253874bef2bc42d1858d];

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_a53ea01ce0f52efa194dbb49f39];

-- DropForeignKey
ALTER TABLE [dbo].[documents] DROP CONSTRAINT [documents_candidate_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[documents] DROP CONSTRAINT [FK_6c6b9775baa0c8973bd829a8e46];

-- DropForeignKey
ALTER TABLE [dbo].[educations] DROP CONSTRAINT [FK_da1ce5966e5d5a43a9e0797e0c0];

-- DropForeignKey
ALTER TABLE [dbo].[familys] DROP CONSTRAINT [FK_4122f645771e9e2938abfd8c0c5];

-- DropForeignKey
ALTER TABLE [dbo].[identity_info] DROP CONSTRAINT [FK_3c87e74de6f99d1c06cf4581fbb];

-- DropForeignKey
ALTER TABLE [dbo].[identity_info] DROP CONSTRAINT [FK_ff510b911992a2917ebdd7fb88a];

-- DropForeignKey
ALTER TABLE [dbo].[sims] DROP CONSTRAINT [FK_c07d287b265501fffa4b4559984];

-- DropForeignKey
ALTER TABLE [dbo].[sims] DROP CONSTRAINT [FK_e18f71ccc446f3c09584647d100];

-- DropForeignKey
ALTER TABLE [dbo].[working_experiences] DROP CONSTRAINT [FK_fdb1fb1f815620c2f82557fdc39];

-- DropIndex
ALTER TABLE [dbo].[banks] DROP CONSTRAINT [UQ_d99ff7685a1d8bc7f203451f196];

-- AlterTable
ALTER TABLE [dbo].[addresses] DROP CONSTRAINT [PK_745d8f43d3af10ab8247465e450];
ALTER TABLE [dbo].[addresses] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[addresses] ALTER COLUMN [postal_code] INT NOT NULL;
ALTER TABLE [dbo].[addresses] ADD CONSTRAINT PK_745d8f43d3af10ab8247465e450 PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[banks] DROP CONSTRAINT [PK_3975b5f684ec241e3901db62d77];
ALTER TABLE [dbo].[banks] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[banks] ALTER COLUMN [bank_account_number] INT NOT NULL;
ALTER TABLE [dbo].[banks] ADD CONSTRAINT PK_3975b5f684ec241e3901db62d77 PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[candidates_diseases] DROP CONSTRAINT [PK_98de0fe4d1c3d848b42d6fc5eab];
ALTER TABLE [dbo].[candidates_diseases] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[candidates_diseases] ADD CONSTRAINT PK_98de0fe4d1c3d848b42d6fc5eab PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[certifications] DROP CONSTRAINT [PK_fd763d412e4a1fb1b6dadd6e72b];
ALTER TABLE [dbo].[certifications] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[certifications] ALTER COLUMN [candidateId] INT NOT NULL;
ALTER TABLE [dbo].[certifications] ADD CONSTRAINT PK_fd763d412e4a1fb1b6dadd6e72b PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[citys] DROP CONSTRAINT [PK_601fc3e41ea83d443260e75334b];
ALTER TABLE [dbo].[citys] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[citys] ADD CONSTRAINT PK_601fc3e41ea83d443260e75334b PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[document_types] DROP CONSTRAINT [PK_d467d7eeb7c8ce216e90e8494aa];
ALTER TABLE [dbo].[document_types] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[document_types] ADD CONSTRAINT PK_d467d7eeb7c8ce216e90e8494aa PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[documents] DROP CONSTRAINT [PK_ac51aa5181ee2036f5ca482857c];
ALTER TABLE [dbo].[documents] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[documents] ALTER COLUMN [byte_size] INT NOT NULL;
ALTER TABLE [dbo].[documents] ALTER COLUMN [documentTypeId] INT NULL;
ALTER TABLE [dbo].[documents] ALTER COLUMN [candidate_id] INT NULL;
ALTER TABLE [dbo].[documents] ADD CONSTRAINT PK_ac51aa5181ee2036f5ca482857c PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[educations] DROP CONSTRAINT [PK_09d2f29e7f6f31f5c01d79d2dbf];
ALTER TABLE [dbo].[educations] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[educations] ALTER COLUMN [candidateId] INT NOT NULL;
ALTER TABLE [dbo].[educations] ADD CONSTRAINT PK_09d2f29e7f6f31f5c01d79d2dbf PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[emergency_contacts] DROP CONSTRAINT [PK_8be191845b6fca1c4e5ba5bd7d1];
ALTER TABLE [dbo].[emergency_contacts] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[emergency_contacts] ADD CONSTRAINT PK_8be191845b6fca1c4e5ba5bd7d1 PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[example_3] DROP CONSTRAINT [PK_3bb2908fae9cb6594c29312c3ac];
ALTER TABLE [dbo].[example_3] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[example_3] ADD CONSTRAINT PK_3bb2908fae9cb6594c29312c3ac PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[familys] DROP CONSTRAINT [PK_347a8e3fa04d0a5013ed082fe97];
ALTER TABLE [dbo].[familys] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[familys] ALTER COLUMN [candidateId] INT NULL;
ALTER TABLE [dbo].[familys] ADD CONSTRAINT PK_347a8e3fa04d0a5013ed082fe97 PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[identity_info] DROP CONSTRAINT [PK_1b708b2de550b69816a56e68f11];
ALTER TABLE [dbo].[identity_info] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[identity_info] ALTER COLUMN [avatarId] INT NULL;
ALTER TABLE [dbo].[identity_info] ALTER COLUMN [ktpPhotoId] INT NULL;
ALTER TABLE [dbo].[identity_info] ADD CONSTRAINT PK_1b708b2de550b69816a56e68f11 PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[sims] DROP CONSTRAINT [PK_65e3dc2c5d993ede14fdf9df1ea];
ALTER TABLE [dbo].[sims] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[sims] ALTER COLUMN [simPhotoIdId] INT NULL;
ALTER TABLE [dbo].[sims] ALTER COLUMN [candidateId] INT NULL;
ALTER TABLE [dbo].[sims] ADD CONSTRAINT PK_65e3dc2c5d993ede14fdf9df1ea PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[skill_types] DROP CONSTRAINT [PK_f98a760e950fc2f7376178e0689];
ALTER TABLE [dbo].[skill_types] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[skill_types] ADD CONSTRAINT PK_f98a760e950fc2f7376178e0689 PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[working_experiences] DROP CONSTRAINT [PK_7ef8ca191515c6b51c75d5390d0];
ALTER TABLE [dbo].[working_experiences] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[working_experiences] ALTER COLUMN [salary] INT NOT NULL;
ALTER TABLE [dbo].[working_experiences] ALTER COLUMN [candidateId] INT NOT NULL;
ALTER TABLE [dbo].[working_experiences] ADD CONSTRAINT PK_7ef8ca191515c6b51c75d5390d0 PRIMARY KEY CLUSTERED ([id]);

-- RedefineTables
BEGIN TRANSACTION;
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [UQ_e9aae9c8df7ce4bc2e356b57219];
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'candidates'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_candidates] (
    [id] INT NOT NULL IDENTITY(1,1),
    [gender] NVARCHAR(32) NOT NULL,
    [religion] NVARCHAR(128),
    [ethnicity] NVARCHAR(64),
    [blood_type] CHAR(1),
    [phone_number] NVARCHAR(14) NOT NULL,
    [current_salary] INT,
    [source_referer] NVARCHAR(128),
    [is_blacklisted] BIT CONSTRAINT [DF_49d807863236b10b9c236d5b5d8] DEFAULT 0,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_5638150fbb378cd6859db255f7b] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME CONSTRAINT [DF_ed9c7e1157bf98c5b2b80b1fd73] DEFAULT CURRENT_TIMESTAMP,
    [userId] INT,
    [bankId] INT,
    [emengencyContactId] INT,
    [addressId] INT,
    [birthCityId] INT NOT NULL,
    [domicileId] INT NOT NULL,
    [linkedin_profile_url] NVARCHAR(512),
    [identityInfoId] INT,
    [date_of_birth] DATE,
    CONSTRAINT [PK_140681296bf033ab1eb95288abb] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_e9aae9c8df7ce4bc2e356b57219] UNIQUE NONCLUSTERED ([phone_number])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_candidates] ON;
IF EXISTS(SELECT * FROM [dbo].[candidates])
    EXEC('INSERT INTO [dbo].[_prisma_new_candidates] ([addressId],[bankId],[birthCityId],[blood_type],[created_at],[current_salary],[date_of_birth],[domicileId],[emengencyContactId],[ethnicity],[gender],[id],[identityInfoId],[is_blacklisted],[linkedin_profile_url],[phone_number],[religion],[source_referer],[updated_at],[userId]) SELECT [addressId],[bankId],[birthCityId],[blood_type],[created_at],[current_salary],[date_of_birth],[domicileId],[emengencyContactId],[ethnicity],[gender],[id],[identityInfoId],[is_blacklisted],[linkedin_profile_url],[phone_number],[religion],[source_referer],[updated_at],[userId] FROM [dbo].[candidates] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_candidates] OFF;
DROP TABLE [dbo].[candidates];
EXEC SP_RENAME N'dbo._prisma_new_candidates', N'candidates';
COMMIT;

-- CreateIndex
ALTER TABLE [dbo].[banks] ADD CONSTRAINT [UQ_d99ff7685a1d8bc7f203451f196] UNIQUE NONCLUSTERED ([bank_account_number]);

-- AddForeignKey
ALTER TABLE [dbo].[certifications] ADD CONSTRAINT [FK_309f34896c518983111ebeca641] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[documents] ADD CONSTRAINT [FK_6c6b9775baa0c8973bd829a8e46] FOREIGN KEY ([documentTypeId]) REFERENCES [dbo].[document_types]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[documents] ADD CONSTRAINT [documents_candidate_id_fkey] FOREIGN KEY ([candidate_id]) REFERENCES [dbo].[candidates]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[educations] ADD CONSTRAINT [FK_da1ce5966e5d5a43a9e0797e0c0] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[familys] ADD CONSTRAINT [FK_4122f645771e9e2938abfd8c0c5] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[identity_info] ADD CONSTRAINT [FK_3c87e74de6f99d1c06cf4581fbb] FOREIGN KEY ([ktpPhotoId]) REFERENCES [dbo].[documents]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[identity_info] ADD CONSTRAINT [FK_ff510b911992a2917ebdd7fb88a] FOREIGN KEY ([avatarId]) REFERENCES [dbo].[documents]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[sims] ADD CONSTRAINT [FK_c07d287b265501fffa4b4559984] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[sims] ADD CONSTRAINT [FK_e18f71ccc446f3c09584647d100] FOREIGN KEY ([simPhotoIdId]) REFERENCES [dbo].[documents]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[working_experiences] ADD CONSTRAINT [FK_fdb1fb1f815620c2f82557fdc39] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
