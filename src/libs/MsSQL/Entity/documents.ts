import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Candidates } from "./candidates";
import { DocumentTypes } from "./documentTypes";

@Entity()
export class Documents {
    @PrimaryGeneratedColumn({
        type: 'numeric'
    })
    id!: string;

    /* candidate_id -> Many to One -> Documents contains many instance Candidates */
    // @ManyToOne(() => Candidates, (candidate) => candidate.documents)
    // candidate!: Candidates;

    /* document_type_id -> Many to One -> Documents contains many instance Document Types */
    @ManyToOne(() => DocumentTypes, (documentType) => documentType.document_types)
    document_type!: DocumentTypes;

    @Column({
        type: 'nvarchar',
        length: 128
    })
    saved_name!: string;

    @Column({
        type: 'nvarchar',
        length: 128
    })
    original_name!: string;

    @Column({
        type: 'numeric',
    })
    byte_size!: number;

    @Column({
        type: 'nvarchar'
    })
    path!: string;

    @Column({
        type: 'varbinary'
    })
    file_base!: string;

    @CreateDateColumn({
        type: 'datetime'
    })
    created_at!: string;

    @UpdateDateColumn({
        type: 'datetime'
    })
    updated_at!: string;

    // @ManyToOne(() => Candidates, (candidate) => candidate.documents)
    // candidate: Candidates;
}