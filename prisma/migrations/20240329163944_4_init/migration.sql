/*
  Warnings:

  - You are about to alter the column `userId` on the `candidates` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - You are about to drop the column `assign_date` on the `efpk_ta` table. All the data in the column will be lost.
  - You are about to drop the column `assign_ta_id` on the `efpk_ta` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,0)` to `Int`.
  - You are about to drop the column `ApprovalDate` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `ApprovalDescription` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `ApprovalNIK` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `ApprovalName` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `CandidateSource` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `CompCode` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `CompName` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `CreateDate` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `EmpType` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `EmployeeReplacement` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `FlagOverBudgetMPP` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `InitiatorEmail` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `InitiatorNIK` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `InitiatorName` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `JobLvlCode` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `JobLvlName` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `JobTitleCode` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `JobTitleName` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `LeadTime` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `LocationCode` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `LocationName` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `OrgCode` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `OrgName` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `OrganizationRecruit` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `OverBudgetMPPReason` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `Reason` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `RejectDate` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `ReplacedCausedBy` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `ReqClosingDate` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `ReqNeedDate` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `RequestNo` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `RequiredDate` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `TaId` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `TotalHold` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `TotalNeed` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `TotalRelized` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `UpdDate` on the `efpk` table. All the data in the column will be lost.
  - You are about to drop the column `UpdUser` on the `efpk` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[efpk_request_no]` on the table `efpk_ta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `efpk_request_no` to the `efpk_ta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ta_id` to the `efpk_ta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flag_over_budget_mpp` to the `efpk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `over_budget_mpp_reason` to the `efpk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `efpk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `request_no` to the `efpk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_hold` to the `efpk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_need` to the `efpk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_relized` to the `efpk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upd_date` to the `efpk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upd_user` to the `efpk` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[candidates] DROP CONSTRAINT [FK_10d0384a816526f8c7f6b1e67b3];

-- AlterTable
ALTER TABLE [dbo].[candidates] ALTER COLUMN [userId] INT NULL;

-- AlterTable
EXEC SP_RENAME N'dbo.PK__efpk_ta__3213E83F57C915CF', N'efpk_ta_pkey';
ALTER TABLE [dbo].[efpk_ta] DROP CONSTRAINT[DF__efpk_ta__assign___4B7734FF];
ALTER TABLE [dbo].[efpk_ta] DROP COLUMN [assign_date],
[assign_ta_id];
ALTER TABLE [dbo].[efpk_ta] ADD [efpk_request_no] NVARCHAR(25) NOT NULL,
[ta_id] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[users] DROP CONSTRAINT [PK_a3ffb1c0c8416b9fc6f907b7433];
ALTER TABLE [dbo].[users] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[users] ADD CONSTRAINT PK_a3ffb1c0c8416b9fc6f907b7433 PRIMARY KEY CLUSTERED ([id]);

-- CreateTable
CREATE TABLE [dbo].[efpk_ta_transaction] (
    [id] INT NOT NULL IDENTITY(1,1),
    [assigned_at] DATETIME NOT NULL CONSTRAINT [efpk_ta_transaction_assigned_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL,
    [efpk_ta_id] INT NOT NULL,
    CONSTRAINT [efpk_ta_transaction_pkey] PRIMARY KEY CLUSTERED ([id])
);

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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'efpk'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_efpk] (
    [request_no] NVARCHAR(25) NOT NULL,
    [job_title_code] NVARCHAR(15),
    [job_title_name] NVARCHAR(80),
    [candidate_source] NVARCHAR(8),
    [total_need] SMALLINT NOT NULL,
    [total_relized] SMALLINT NOT NULL,
    [total_hold] SMALLINT NOT NULL,
    [flag_over_budget_mpp] NVARCHAR(14) NOT NULL,
    [over_budget_mpp_reason] TEXT NOT NULL,
    [create_date] DATETIME,
    [required_date] DATETIME,
    [status] NVARCHAR(17),
    [reason] NVARCHAR(11) NOT NULL,
    [employee_replacement] NVARCHAR(108),
    [replaced_caused_by] NVARCHAR(30),
    [organization_recruit] NVARCHAR(48),
    [org_code] NVARCHAR(25),
    [org_name] NVARCHAR(80),
    [job_lvl_code] NVARCHAR(10),
    [job_lvl_name] NVARCHAR(80),
    [location_code] NVARCHAR(15),
    [location_name] NVARCHAR(80),
    [comp_code] NVARCHAR(15),
    [comp_name] NVARCHAR(80),
    [emp_type] NVARCHAR(30),
    [req_need_date] DATETIME,
    [req_closing_date] DATETIME,
    [initiator_nik] NVARCHAR(25),
    [initiator_name] NVARCHAR(80),
    [initiator_email] NVARCHAR(60),
    [lead_time] DATETIME,
    [description] TEXT,
    [approval_nik] NVARCHAR(25),
    [approval_name] NVARCHAR(80),
    [approval_date] NVARCHAR(30),
    [reject_date] NVARCHAR(30),
    [approval_description] NVARCHAR(255),
    [upd_date] DATETIME NOT NULL,
    [upd_user] NVARCHAR(30) NOT NULL,
    CONSTRAINT [efpk_pkey] PRIMARY KEY CLUSTERED ([request_no])
);
IF EXISTS(SELECT * FROM [dbo].[efpk])
    EXEC('INSERT INTO [dbo].[_prisma_new_efpk] () SELECT  FROM [dbo].[efpk] WITH (holdlock tablockx)');
DROP TABLE [dbo].[efpk];
EXEC SP_RENAME N'dbo._prisma_new_efpk', N'efpk';
COMMIT;

-- CreateIndex
ALTER TABLE [dbo].[efpk_ta] ADD CONSTRAINT [efpk_ta_efpk_request_no_key] UNIQUE NONCLUSTERED ([efpk_request_no]);

-- AddForeignKey
ALTER TABLE [dbo].[candidates] ADD CONSTRAINT [FK_10d0384a816526f8c7f6b1e67b3] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[efpk_ta] ADD CONSTRAINT [efpk_ta_ta_id_fkey] FOREIGN KEY ([ta_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[efpk_ta] ADD CONSTRAINT [efpk_ta_efpk_request_no_fkey] FOREIGN KEY ([efpk_request_no]) REFERENCES [dbo].[efpk]([request_no]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[efpk_ta_transaction] ADD CONSTRAINT [efpk_ta_transaction_efpk_ta_id_fkey] FOREIGN KEY ([efpk_ta_id]) REFERENCES [dbo].[efpk_ta]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
