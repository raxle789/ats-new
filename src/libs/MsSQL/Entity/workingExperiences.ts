import { Entity, Column, JoinTable, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Candidates } from "./candidates";

@Entity()
export class WorkingExperiences {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number;

    /* Many to One ->  Working Experience contains multiple instance of Candidates */
    @ManyToOne(() => Candidates, (candidate) => candidate.working_experiences, { nullable: false })
    candidate!: Candidates;

    @Column({
        type: 'nvarchar',
        length: 256
    })
    company_name!: string;
    
    @Column({
        type: 'nvarchar',
        length: '64'
    })
    job_level: string;

    @Column({
        type: 'nvarchar',
        length: 128
    })
    line_industry!: string;

    @Column({
        type: 'nvarchar',
        length: 128
    })
    job_title!: string;

    @Column({
        type: 'nvarchar',
        length: 256
    })
    job_function!: string;

    @Column({
        type: 'nvarchar',
        length: 512
    })
    job_description!: string;

    @Column({
        type: 'numeric'
    })
    salary!: number;

    @Column({
        type: 'date'
    })
    start_at!: string;

    @Column({
        type: 'date'
    })
    end_at!: string;

    @Column({
        type: 'bit'
    })
    is_currently!: number;

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