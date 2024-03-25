import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Candidates } from "./candidates";

@Entity()
export class Citys {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number;
    
    @Column({
        type: 'nvarchar',
        length: 256
    })
    city_name!: string;
    
    /* One to Many -> City contains only one instance of Candidates */
    // @OneToMany(() => Candidates, (candidate) => candidate.birth_city)
    birth_citys?: Candidates[];

    // /* One to Many -> City contains only one instance od Candidates */
    // @OneToMany(() => Candidates, (candidate) => candidate.domicile)
    domiciles?: Candidates[];
}