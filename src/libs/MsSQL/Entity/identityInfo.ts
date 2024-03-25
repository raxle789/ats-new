import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Documents } from "./documents";

@Entity()
export class IdentityInfo {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number;

    @OneToOne(() => Documents)
    @JoinColumn()
    avatar!: Documents;

    @OneToOne(() => Documents)
    @JoinColumn()
    ktp_photo!: Documents;

    @Column({
        type: 'nvarchar',
        length: 16
    })
    ktp_number!: string;

    @Column({
        type: 'nvarchar',
        length: 16
    })
    kk_number!: string;

    @Column({
        type: 'nvarchar',
        length: 32
    })
    passport_number!: string;

    @Column({
        type: 'nvarchar',
        length: 9,
        nullable: true
    })
    npwp_number!: string;
}