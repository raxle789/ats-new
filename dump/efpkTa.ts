import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Users } from './users';

@Entity({ name: 'efpk_ta' })
export class EfpkTa {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => Users, (u) => u.efpks)
  @JoinColumn({ name: 'ta_id', referencedColumnName: 'id' })
  user: Users;

  @CreateDateColumn({ type: 'datetime', nullable: false, name: 'assign_date' })
  assignDate: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false, name: 'update_date' })
  updateDate: Date;
}
