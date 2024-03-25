import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SkillTypes {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number

    @Column({
        type: 'nvarchar',
        length: 126
    })
    skill_name!: string
}