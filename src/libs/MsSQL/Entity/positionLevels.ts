import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PositionLevelRequirements } from './positionLevelRequirements';

@Entity({ name: 'position_levels' })
class PositionLevels {
  @PrimaryGeneratedColumn({ type: 'numeric', name: 'id' })
  id!: number;

  @Column({ type: 'nvarchar', length: 510, name: 'name', nullable: false })
  name!: String;

  @Column({ type: 'int', name: 'level', nullable: false })
  level!: number;

  @Column({ type: 'int', name: 'score', nullable: false })
  score!: number;

  @Column({ type: 'int', name: 'sla_days', nullable: true })
  slaDays!: number;

  @CreateDateColumn({ type: 'datetime', name: 'created_at', nullable: false })
  createDate!: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at', nullable: false })
  updateDate!: Date;

  // @OneToMany(() => PositionLevelRequirements, (p) => p.positionLevels)
  positionLevelRequirements!: PositionLevelRequirements[];
}

export { PositionLevels };
