import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number

    @Column({
        type: 'nvarchar',
        length: 256
    })
    name!: string

    @Column({
        type: 'nvarchar',
        length: 128,
        unique: true
    })
    email!: string

    @Column({
        type: 'bit',
        nullable: true
    })
    is_email_verified!: number;

    @Column({
        type: 'nvarchar',
        length: 512
    })
    password!: string

    @CreateDateColumn({
        type: 'datetime',
    })
    created_at!: string

    @UpdateDateColumn({
        type: 'datetime',
        nullable: true
    })
    updated_at!: string
};
