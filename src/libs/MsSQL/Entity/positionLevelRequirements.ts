import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { PositionLevels } from './positionLevels';
import { PositionLevelRequirementFields } from './positionLevelRequirementFields';

@Entity({ name: 'position_level_requirements' })
export class PositionLevelRequirements {
  // @PrimaryColumn({
  //   type: 'numeric',
  //   name: 'requirement_field_id',
  //   nullable: false,
  // })
  // positionLevelRequirementFieldsId: number;

  // @PrimaryColumn({
  //   type: 'numeric',
  //   name: 'position_level_id',
  //   nullable: false,
  // })
  // positionLevelsId: number;

  @ManyToOne(() => PositionLevels, (p) => p.positionLevelRequirements)
  @ManyToOne('PositionLevels', 'positionLevelRequirements')
  @PrimaryColumn()
  @JoinColumn({ name: 'position_level_id', referencedColumnName: 'id' })
  positionLevels!: PositionLevels;

  @ManyToOne('PositionLevelRequirementFields', 'positionLevelRequirements')
  @PrimaryColumn()
  @JoinColumn({ name: 'requirement_field_id', referencedColumnName: 'id' })
  positionLevelRequirementFields!: PositionLevelRequirementFields;

  @Column({ type: 'nvarchar', length: 510, name: 'value', nullable: false })
  value!: String;
}
