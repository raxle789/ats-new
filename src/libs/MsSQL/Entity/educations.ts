import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Candidates } from './candidates';

@Entity()
export class Educations {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number;

    @ManyToOne(() => Candidates, (candidate) => candidate.educations, { nullable: false })
    candidate!: Candidates;

    @Column({
        type: 'smallint'
    })
    start_year!: number;

    @Column({
        type: 'smallint',
    })
    end_year!: number;

    @Column({
        type: 'nvarchar',
        length: 256
    })
    university_name!: string;

    @Column({
        type: 'nvarchar',
        length: 128
    })
    major!: string;

    @Column({
        type: 'float'
    })
    gpa!: number;

    @Column({
        type: 'nvarchar',
        length: 64
    })
    language!: string;

    @Column({
        type: 'bit'
    })
    is_latest!: number;

    @Column({
        type: 'bit'
    })
    is_graduate!: number;

    @CreateDateColumn({
        type: 'datetime'
    })
    created_at!: string;

    @UpdateDateColumn({
        type: 'datetime',
        nullable: true
    })
    updated_at!: string;
}