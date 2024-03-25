import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class CandidatesOthersInfo {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number;

    
}
