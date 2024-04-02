import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Banks {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number;

    @Column({
        type: 'nvarchar',
        length: 64
    })
    bank_name!: string;

    @Column({
        type: 'nvarchar',
        length: 64
    })
    bank_branch!: string;

    @Column({
        type: 'numeric',
        unique: true
    })
    bank_account_number!: string;
}