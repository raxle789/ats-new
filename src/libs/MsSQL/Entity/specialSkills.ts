import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { SkillTypes } from "./skillTypes";
@Entity()
export class SpecialSkill {
    @PrimaryGeneratedColumn()
    id!: number

    @OneToMany(() => SkillTypes, (skilltype) => skilltype.id)
    skilltypes!: SkillTypes[]

    /* Many to One Candidates */
}