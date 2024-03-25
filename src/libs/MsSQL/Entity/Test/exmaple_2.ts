import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { example_1 } from './exmaple_1';

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

    @ManyToOne(() => example_1, (example_1) => example_1.examples2)
    example_1!: example_1;
}