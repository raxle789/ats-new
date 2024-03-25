import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Documents } from "./documents";
import { Candidates } from "./candidates";

@Entity()
export class Sims {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number;

    /* candidate_id -> Many to One -> Sims contains many instance Candidates */
    @ManyToOne(() => Candidates, (candidate) => candidate.sims)
    candidate!: Candidates;

    @Column({
        type: 'nvarchar',
        length: '64'
    })
    sim_type!: string;

    @Column({
        type: 'nvarchar',
        length: '128'
    })
    sim_number!: string;

    @OneToOne(() => Documents)
    @JoinColumn()
    sim_photo_id!: Documents;
}