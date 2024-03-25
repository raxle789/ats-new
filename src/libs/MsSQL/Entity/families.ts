import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Candidate } from "./candidates";

@Entity()
export class Family {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number;

    /* Foreign -> Candidate */
    @ManyToOne(() => Candidate, (candidate) => candidate.id)
    candidate!: Candidate[];

    @Column({
        type: 'nvarchar',
        length: '64'
    })
    type!: string;

    @Column({
        type: 'string',
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

    @Column({
        type: 'datetime'
    })
    created_at!: string;

    @Column({
        type: 'datetime',
        nullable: true
    })
    updated_at!: string;
}