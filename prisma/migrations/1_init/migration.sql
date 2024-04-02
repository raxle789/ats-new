BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[addresses] (
    [id] DECIMAL(18,0) NOT NULL,
    [street_address] NVARCHAR(256) NOT NULL,
    [city] NVARCHAR(128) NOT NULL,
    [province] NVARCHAR(256) NOT NULL,
    [postal_code] DECIMAL(18,0) NOT NULL,
    [country] NVARCHAR(255) NOT NULL CONSTRAINT [DF_35936c20d74117b96ca37c06dbf] DEFAULT 'Indonesia',
    CONSTRAINT [PK_745d8f43d3af10ab8247465e450] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[banks] (
    [id] DECIMAL(18,0) NOT NULL,
    [bank_name] NVARCHAR(64) NOT NULL,
    [bank_branch] NVARCHAR(64) NOT NULL,
    [bank_account_number] DECIMAL(18,0) NOT NULL,
    CONSTRAINT [PK_3975b5f684ec241e3901db62d77] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_d99ff7685a1d8bc7f203451f196] UNIQUE NONCLUSTERED ([bank_account_number])
);

-- CreateTable
CREATE TABLE [dbo].[candidates] (
    [id] DECIMAL(18,0) NOT NULL,
    [gender] NVARCHAR(32) NOT NULL,
    [religion] NVARCHAR(128),
    [ethnicity] NVARCHAR(64),
    [blood_type] CHAR(1),
    [phone_number] NVARCHAR(14) NOT NULL,
    [current_salary] DECIMAL(18,0),
    [source_referer] NVARCHAR(128),
    [is_blacklisted] BIT CONSTRAINT [DF_49d807863236b10b9c236d5b5d8] DEFAULT 0,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_5638150fbb378cd6859db255f7b] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME CONSTRAINT [DF_ed9c7e1157bf98c5b2b80b1fd73] DEFAULT CURRENT_TIMESTAMP,
    [userId] DECIMAL(18,0),
    [bankId] DECIMAL(18,0),
    [emengencyContactId] DECIMAL(18,0),
    [addressId] DECIMAL(18,0),
    [birthCityId] DECIMAL(18,0) NOT NULL,
    [domicileId] DECIMAL(18,0) NOT NULL,
    [linkedin_profile_url] NVARCHAR(512),
    [identityInfoId] DECIMAL(18,0),
    CONSTRAINT [PK_140681296bf033ab1eb95288abb] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_e9aae9c8df7ce4bc2e356b57219] UNIQUE NONCLUSTERED ([phone_number])
);

-- CreateTable
CREATE TABLE [dbo].[candidates_diseases] (
    [id] DECIMAL(18,0) NOT NULL,
    [disease_name] NVARCHAR(126) NOT NULL,
    [diagnosis_date] DATE NOT NULL,
    CONSTRAINT [PK_98de0fe4d1c3d848b42d6fc5eab] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[certifications] (
    [id] DECIMAL(18,0) NOT NULL,
    [certification_name] NVARCHAR(256) NOT NULL,
    [url] NVARCHAR(512) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_b4df756126a0a63ec5d1dcbb79c] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME CONSTRAINT [DF_804840a17448cc76bd307be181c] DEFAULT CURRENT_TIMESTAMP,
    [candidateId] DECIMAL(18,0) NOT NULL,
    CONSTRAINT [PK_fd763d412e4a1fb1b6dadd6e72b] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[citys] (
    [id] DECIMAL(18,0) NOT NULL,
    [city_name] NVARCHAR(256) NOT NULL,
    CONSTRAINT [PK_601fc3e41ea83d443260e75334b] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[document_types] (
    [id] DECIMAL(18,0) NOT NULL,
    [document_name] NVARCHAR(128) NOT NULL,
    CONSTRAINT [PK_d467d7eeb7c8ce216e90e8494aa] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[documents] (
    [id] DECIMAL(18,0) NOT NULL,
    [saved_name] NVARCHAR(128) NOT NULL,
    [original_name] NVARCHAR(128) NOT NULL,
    [byte_size] DECIMAL(18,0) NOT NULL,
    [path] NVARCHAR(255) NOT NULL,
    [file_base] VARBINARY(1) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_0ac6db0be1ba323e80e653b0e6d] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [DF_0fa0f20571d78848ea6e36f75b5] DEFAULT CURRENT_TIMESTAMP,
    [documentTypeId] DECIMAL(18,0),
    CONSTRAINT [PK_ac51aa5181ee2036f5ca482857c] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[educations] (
    [id] DECIMAL(18,0) NOT NULL,
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
    [candidateId] DECIMAL(18,0) NOT NULL,
    CONSTRAINT [PK_09d2f29e7f6f31f5c01d79d2dbf] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[efpk] (
    [RequestNo] VARCHAR(25) NOT NULL,
    [JobTitleCode] VARCHAR(15),
    [JobTitleName] VARCHAR(80),
    [CandidateSource] VARCHAR(8),
    [TotalNeed] SMALLINT NOT NULL,
    [TotalRelized] SMALLINT NOT NULL,
    [TotalHold] SMALLINT NOT NULL,
    [FlagOverBudgetMPP] VARCHAR(14) NOT NULL,
    [OverBudgetMPPReason] TEXT NOT NULL,
    [CreateDate] DATETIME,
    [RequiredDate] DATETIME,
    [Status] VARCHAR(17),
    [Reason] VARCHAR(11) NOT NULL,
    [EmployeeReplacement] VARCHAR(108),
    [ReplacedCausedBy] VARCHAR(30),
    [OrganizationRecruit] VARCHAR(48),
    [OrgCode] VARCHAR(25),
    [OrgName] VARCHAR(80),
    [JobLvlCode] VARCHAR(10),
    [JobLvlName] VARCHAR(80),
    [LocationCode] VARCHAR(15),
    [LocationName] VARCHAR(80),
    [CompCode] VARCHAR(15),
    [CompName] VARCHAR(80),
    [EmpType] VARCHAR(30),
    [ReqNeedDate] DATETIME,
    [ReqClosingDate] DATETIME,
    [InitiatorNIK] VARCHAR(25),
    [InitiatorName] VARCHAR(80),
    [InitiatorEmail] VARCHAR(60),
    [LeadTime] DATETIME,
    [Description] TEXT,
    [ApprovalNIK] VARCHAR(25),
    [ApprovalName] VARCHAR(80),
    [ApprovalDate] VARCHAR(30),
    [RejectDate] VARCHAR(30),
    [ApprovalDescription] VARCHAR(255),
    [UpdDate] DATETIME NOT NULL,
    [UpdUser] VARCHAR(30) NOT NULL,
    [TaId] DECIMAL(18,0)
);

-- CreateTable
CREATE TABLE [dbo].[efpk_ta] (
    [id] INT NOT NULL IDENTITY(1,1),
    [assign_date] DATETIME NOT NULL CONSTRAINT [DF__efpk_ta__assign___4B7734FF] DEFAULT CURRENT_TIMESTAMP,
    [assign_ta_id] INT NOT NULL,
    CONSTRAINT [PK__efpk_ta__3213E83F57C915CF] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[emergency_contacts] (
    [id] DECIMAL(18,0) NOT NULL,
    [contact_name] NVARCHAR(126) NOT NULL,
    [phone_number] NVARCHAR(16) NOT NULL,
    CONSTRAINT [PK_8be191845b6fca1c4e5ba5bd7d1] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[example_1] (
    [id] INT NOT NULL IDENTITY(1,1),
    [book_name] NVARCHAR(64) NOT NULL,
    CONSTRAINT [PK__example___3213E83F1E42926B] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[example_2] (
    [id] INT NOT NULL IDENTITY(1,1),
    [author_name] NVARCHAR(128) NOT NULL,
    [example1Id] INT,
    CONSTRAINT [PK__example___3213E83FB5014ECF] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[example_3] (
    [id] DECIMAL(18,0) NOT NULL,
    [publisher] NVARCHAR(64) NOT NULL,
    CONSTRAINT [PK_3bb2908fae9cb6594c29312c3ac] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[familys] (
    [id] DECIMAL(18,0) NOT NULL,
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
    [candidateId] DECIMAL(18,0),
    CONSTRAINT [PK_347a8e3fa04d0a5013ed082fe97] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[identity_info] (
    [id] DECIMAL(18,0) NOT NULL,
    [ktp_number] NVARCHAR(16) NOT NULL,
    [kk_number] NVARCHAR(16) NOT NULL,
    [passport_number] NVARCHAR(32) NOT NULL,
    [npwp_number] NVARCHAR(9),
    [avatarId] DECIMAL(18,0),
    [ktpPhotoId] DECIMAL(18,0),
    CONSTRAINT [PK_1b708b2de550b69816a56e68f11] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[initiators] (
    [user_id] DECIMAL(18,0),
    [nik] VARCHAR(25),
    [name] NVARCHAR(255),
    [email] NVARCHAR(510),
    [phone] NVARCHAR(510),
    [position] NVARCHAR(510)
);

-- CreateTable
CREATE TABLE [dbo].[job_levels] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(255) NOT NULL,
    [level] INT,
    [score] INT NOT NULL,
    [sla_days] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_JobLevel] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[job_vacancy_parameter_requirements] (
    [parameter_id] INT NOT NULL,
    [requirement_id] INT NOT NULL
);

-- CreateTable
CREATE TABLE [dbo].[job_vacancy_parameters] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] TEXT NOT NULL,
    [job_level_id] INT NOT NULL,
    CONSTRAINT [PK__job_para__3213E83FD445AE28] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[job_vacancy_requirements] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK__job_vaca__3213E83FE7F58A2C] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[phones] (
    [id] DECIMAL(20,0) NOT NULL,
    [user_id] INT NOT NULL,
    [type] NVARCHAR(255),
    [number] NVARCHAR(255),
    [status] NVARCHAR(255),
    [current] SMALLINT,
    [created_at] DATETIME,
    [updated_at] DATETIME
);

-- CreateTable
CREATE TABLE [dbo].[roles] (
    [id] DECIMAL(20,0) NOT NULL,
    [name] NVARCHAR(255) NOT NULL,
    [guard] NVARCHAR(255) NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME
);

-- CreateTable
CREATE TABLE [dbo].[sims] (
    [id] DECIMAL(18,0) NOT NULL,
    [sim_type] NVARCHAR(64) NOT NULL,
    [sim_number] NVARCHAR(128) NOT NULL,
    [simPhotoIdId] DECIMAL(18,0),
    [candidateId] DECIMAL(18,0),
    CONSTRAINT [PK_65e3dc2c5d993ede14fdf9df1ea] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[skill_types] (
    [id] DECIMAL(18,0) NOT NULL,
    [skill_name] NVARCHAR(126) NOT NULL,
    CONSTRAINT [PK_f98a760e950fc2f7376178e0689] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] DECIMAL(18,0) NOT NULL,
    [name] NVARCHAR(256) NOT NULL,
    [email] NVARCHAR(128) NOT NULL,
    [is_email_verified] BIT,
    [password] NVARCHAR(512) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_c9b5b525a96ddc2c5647d7f7fa5] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME CONSTRAINT [DF_6d596d799f9cb9dac6f7bf7c23c] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_a3ffb1c0c8416b9fc6f907b7433] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_97672ac88f789774dd47f7c8be3] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[working_experiences] (
    [id] DECIMAL(18,0) NOT NULL,
    [company_name] NVARCHAR(256) NOT NULL,
    [line_industry] NVARCHAR(128) NOT NULL,
    [job_title] NVARCHAR(128) NOT NULL,
    [job_function] NVARCHAR(256) NOT NULL,
    [job_description] NVARCHAR(512) NOT NULL,
    [salary] DECIMAL(18,0) NOT NULL,
    [start_at] DATE NOT NULL,
    [end_at] DATE NOT NULL,
    [is_currently] BIT NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_6aad921dfbb2e334f6a9fdd823b] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME CONSTRAINT [DF_54053863149a7090457b86a587c] DEFAULT CURRENT_TIMESTAMP,
    [candidateId] DECIMAL(18,0) NOT NULL,
    CONSTRAINT [PK_7ef8ca191515c6b51c75d5390d0] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[candidates] ADD CONSTRAINT [FK_02cb34982ecd17fda09c240254e] FOREIGN KEY ([emengencyContactId]) REFERENCES [dbo].[emergency_contacts]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[candidates] ADD CONSTRAINT [FK_10d0384a816526f8c7f6b1e67b3] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

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

-- AddForeignKey
ALTER TABLE [dbo].[certifications] ADD CONSTRAINT [FK_309f34896c518983111ebeca641] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[documents] ADD CONSTRAINT [FK_6c6b9775baa0c8973bd829a8e46] FOREIGN KEY ([documentTypeId]) REFERENCES [dbo].[document_types]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[educations] ADD CONSTRAINT [FK_da1ce5966e5d5a43a9e0797e0c0] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[example_2] ADD CONSTRAINT [FK_0794609c75f558a527d031b5229] FOREIGN KEY ([example1Id]) REFERENCES [dbo].[example_1]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[familys] ADD CONSTRAINT [FK_4122f645771e9e2938abfd8c0c5] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[candidates]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[identity_info] ADD CONSTRAINT [FK_3c87e74de6f99d1c06cf4581fbb] FOREIGN KEY ([ktpPhotoId]) REFERENCES [dbo].[documents]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[identity_info] ADD CONSTRAINT [FK_ff510b911992a2917ebdd7fb88a] FOREIGN KEY ([avatarId]) REFERENCES [dbo].[documents]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_parameter_requirements] ADD CONSTRAINT [FK_Parameter] FOREIGN KEY ([parameter_id]) REFERENCES [dbo].[job_vacancy_parameters]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_parameter_requirements] ADD CONSTRAINT [FK_Requirement] FOREIGN KEY ([requirement_id]) REFERENCES [dbo].[job_vacancy_requirements]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_vacancy_parameters] ADD CONSTRAINT [FK_JobLevel] FOREIGN KEY ([job_level_id]) REFERENCES [dbo].[job_levels]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

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

