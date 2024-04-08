import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import { example_2 } from "./exmaple_2";
import { example_1 } from "./exmaple_1";

@Entity()
export class example_3 {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number;

    @Column({
        type: 'nvarchar',
        length: 64
    })
    publisher!: string;

    @OneToMany(() => example_2, (example_2) => example_2.example_3)
    examples_2!: example_2[];
}