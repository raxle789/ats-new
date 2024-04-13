import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { example_2 } from './exmaple_2';
import { example_3 } from "./exmaple_3";
@Entity()
export class example_1 {
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id!: number;
    
    @Column({
        type: 'nvarchar',
        length: 64
    })
    book_name!: string;

    // @OneToMany(() => example_2, (example_2) => example_2.example_1)
    // examples2!: example_2[];

    /* re-defined */
    @ManyToOne(() => example_2, (example_2) => example_2.examples_1)
    example_2!: example_2;
}