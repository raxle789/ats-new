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

@Entity()
export class EfpkTa {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => User, (user) => user.efpks)
  @JoinColumn({ name: 'ta_id', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn({ type: 'datetime', nullable: false, name: 'assign_date' })
  assignDate: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false, name: 'update_date' })
  updateDate: Date;
}
