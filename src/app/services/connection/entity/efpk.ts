import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { EfpkTa } from './efpkTa';

@Entity();
export class Efpk {
  @Column({ type: 'varchar', length: 25, nullable: false })
  RequestNo: String;

  @Column({ type: 'varchar', length: 15, nullable: true })
  JobTitleCode: String;

  @Column({ type: 'varchar', length: 80, nullable: true })
  JobTitleName: String;

  @Column({ type: 'varchar', length: 8, nullable: true })
  CandidateSource: String;

  @Column({ type: 'smallint', nullable: false })
  TotalNeed: number;

  @Column({ type: 'smallint', nullable: false })
  TotalRelized: number;

  @Column({ type: 'smallint', nullable: false })
  TotalHold: number;

  @Column({ type: 'varchar', length: 14, nullable: false })
  FlagOverBudgetMPP: String;

  @Column({ type: 'text', nullable: false })
  OverBudgetMPPReason: String;

  @Column({ type: 'datetime', nullable: true })
  CreateDate: Date;

  @Column({ type: 'datetime', nullable: true })
  RequiredDate: Date;

  @Column({ type: 'varchar', length: 17, nullable: true })
  Status: String;

  @Column({ type: 'varchar', length: 11, nullable: false })
  Reason: String;

  @Column({ type: 'varchar', length: 108, nullable: true })
  EmployeeReplacement: String;

  @Column({ type: 'varchar', length: 30, nullable: true })
  ReplacedCausedBy: String;

  @Column({ type: 'varchar', length: 48, nullable: true })
  OrganizationRecruit: String;

  @Column({ type: 'varchar', length: 25, nullable: true })
  OrgCode: String;

  @Column({ type: 'varchar', length: 80, nullable: true })
  OrgName: String;

  @Column({ type: 'varchar', length: 10, nullable: true })
  JobLvlCode: String;

  @Column({ type: 'varchar', length: 80, nullable: true })
  JobLvlName: String;

  @Column({ type: 'varchar', length: 15, nullable: true })
  LocationCode: String;

  @Column({ type: 'varchar', length: 80, nullable: true })
  LocationName: String;

  @Column({ type: 'varchar', length: 15, nullable: true })
  CompCode: String;

  @Column({ type: 'varchar', length: 80, nullable: true })
  CompName: String;

  @Column({ type: 'varchar', length: 30, nullable: true })
  EmpType: String;

  @Column({ type: 'datetime', nullable: true })
  ReqNeedDate: Date;

  @Column({ type: 'datetime', nullable: true })
  ReqClosingDate: Date;

  @Column({ type: 'varchar', length: 25, nullable: true })
  InitiatorNIK: String;

  @Column({ type: 'varchar', length: 80, nullable: true })
  InitiatorName: String;

  @Column({ type: 'varchar', length: 60, nullable: true })
  InitiatorEmail: String;

  @Column({ type: 'datetime', nullable: true })
  LeadTime: Date;

  @Column({ type: 'text', nullable: true })
  Description: String;

  @Column({ type: 'varchar', length: 25, nullable: true })
  ApprovalNIK: String;

  @Column({ type: 'varchar', length: 80, nullable: true })
  ApprovalName: String;

  @Column({ type: 'varchar', length: 30, nullable: true })
  ApprovalDate: Date;

  @Column({ type: 'varchar', length: 30, nullable: true })
  RejectDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ApprovalDescription: String;

  @Column({ type: 'datetime', nullable: false })
  UpdDate: Date;

  @Column({ type: 'varchar', length: 30, nullable: false })
  UpdUser: String;

  @OneToOne(() => EfpkTa)
  @JoinColumn({name: "assign_id", referencedColumnName: "id"})
  efpkTa: EfpkTa;
}
