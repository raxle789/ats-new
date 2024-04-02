import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PositionLevelRequirements } from './positionLevelRequirements';

@Entity({ name: 'position_level_requirement_fields' })
export class PositionLevelRequirementFields {
  @PrimaryGeneratedColumn({ type: 'numeric', name: 'id' })
  id!: number;

  @Column({ type: 'nvarchar', length: 510, name: 'name', nullable: false })
  name!: String;

  @CreateDateColumn({ type: 'datetime', name: 'created_at', nullable: false })
  createDate!: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at', nullable: false })
  updateDate!: Date;

  // @OneToMany(
  //   () => PositionLevelRequirements,
  //   (p) => p.positionLevelRequirementFields,
  // )
  positionLevelRequirements!: PositionLevelRequirements[];
}
