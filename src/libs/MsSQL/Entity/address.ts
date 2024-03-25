import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Addresses {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number;

    @Column({
        type: 'nvarchar',
        length: 256
    })
    street_address!: string;

    @Column({
        type: 'nvarchar',
        length: 128
    })
    city!: string;

    @Column({
        type: 'nvarchar',
        length: 256
    })
    province!: string;

    @Column({
        type: 'numeric'
    })
    postal_code!: number;

    @Column({
        type: 'nvarchar',
        default: 'Indonesia'
    })
    country!: string;
}