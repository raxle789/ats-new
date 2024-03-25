import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { example_2 } from "./exmaple_2";
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
    examples2!: example_2[];
}