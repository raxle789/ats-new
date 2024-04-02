import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Candidates } from "./candidates";

@Entity()
export class Familys {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number;

    /* Foreign -> Candidate */
    @ManyToOne(() => Candidates, (candidate) => candidate.families)
    candidate!: Candidates;

    @Column({
        type: 'nvarchar',
        length: 64
    })
    type!: string;

    @Column({
        type: 'nvarchar',
        length: 128
    })
    relationship!: string;

    @Column({
        type: 'nvarchar',
        length: 256
    })
    name!: string;

    @Column({
        type: 'nvarchar',
        length: 64
    })
    gender!: string;

    @Column({
        type: 'date'
    })
    date_of_birth!: string;

    @Column({
        type: 'nvarchar',
        length: 256
    })
    last_education!: string;

    @Column({
        type: 'nvarchar',
        length: 128
    })
    work_position!: string;

    @Column({
        type: 'nvarchar',
        length: 16
    })
    ktp_number!: string;

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