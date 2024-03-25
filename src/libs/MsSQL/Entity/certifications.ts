import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Candidates } from "./candidates";

@Entity()
export class Certifications {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number;

    @ManyToOne(() => Candidates, (candidate) => candidate.certifications, { nullable: false })
    candidate!: Candidates;

    @Column({
        type: 'nvarchar',
        length: '256'
    })
    certification_name!: string;

    @Column({
        type: 'nvarchar',
        length: '512'
    })
    url!: string;

    @CreateDateColumn({
        type: 'datetime'
    })
    created_at!: string;

    @UpdateDateColumn({
        type: 'datetime',
        nullable: true
    })
    updated_at!: string;

    /* === Relations === */
}