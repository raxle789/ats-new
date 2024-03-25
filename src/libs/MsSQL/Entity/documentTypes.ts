import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Documents } from "./documents";

@Entity()
export class DocumentTypes {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: number;

    @Column({
        type: 'nvarchar',
        length: '128'
    })
    document_name!: string;

    /* Relations */
    // @OneToMany(() => Documents, (document) => document.document_type)
    document_types!: Documents[];
}