import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Candidates } from './candidates';

@Entity()
export class CandidatesDiseases {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number;

    @Column({
        type: 'nvarchar',
        length: 126
    })
    disease_name!: string;

    @Column({
        type: 'date'
    })
    diagnosis_date!: string;

    // @ManyToOne(() => Candidates, (candidate) => candidate.diseases)
    // candidate!: Candidates;
}