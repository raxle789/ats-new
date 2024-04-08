import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { example_1 } from './exmaple_1';
import { example_3 } from "./exmaple_3";

@Entity()
export class example_2 {
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id!: number;

    @Column({
        type: 'nvarchar',
        length: 128
    })
    author_name!: string;

    // @ManyToOne(() => example_1, (example_1) => example_1.examples2)
    // example_1!: example_1;

    /* re-defined */
    @OneToMany(() => example_1, (example_1) => example_1.example_2)
    examples_1!: example_1[];

    @ManyToOne(() => example_3, (example_3) => example_3.examples_2)
    example_3!: example_3;
}