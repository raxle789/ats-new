import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmergencyContacts {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number;

    @Column({
        type: 'nvarchar',
        length: 126
    })
    contact_name!: string;

    @Column({
        type: 'nvarchar',
        length: 16
    })
    phone_number!: number;
}