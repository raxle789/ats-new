import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Users } from './users';
import { Citys } from "./citys";
import { Addresses } from "./address";
import { Documents } from "./documents";
import { IdentityInfo } from "./identityInfo";
import { Banks } from "./banks";
import { EmergencyContacts } from "./emergencyContact";
import { Educations } from "./educations";
import { Familys } from "./families";
import { Sims } from "./sim";
import { WorkingExperiences } from "./workingExperiences";
import { Certifications } from './certifications';
import { CandidatesDiseases } from "./candidatesDiseases";

@Entity()
export class Candidates {
    @PrimaryGeneratedColumn({
        type: 'numeric',
    })
    id!: number;

    /* user_id -> One to One -> Candidates constains olny one instance Users */
    @OneToOne(() => Users)
    @JoinColumn()
    user!: Users

    /* birth_city_id -> Many to One -> Candidates(domicile) contains multiple instances of City */
    @ManyToOne(() => Citys, (city) => city.birth_citys, { nullable: false })
    birth_city!: Citys;

    /* domicile_id -> Many to One -> Candidates(birth_city) contains multiple instances of City */
    @ManyToOne(() => Citys, (city) => city.domiciles, { nullable: false })
    domicile!: Citys;

    /* identity_info_id -> One to One -> Candidates contains only one instance Identity Info */
    @OneToOne(() => IdentityInfo)
    @JoinColumn()
    identity_info!: IdentityInfo;

    /* bank_id -> One to One -> Candidates contains only one Banks */
    @OneToOne(() => Banks)
    @JoinColumn()
    bank!: Banks;

    /* emergency_contact_id -> One to One -> Candidates contains only one Emergency Contacts */
    @OneToOne(() => EmergencyContacts)
    @JoinColumn()
    emengency_contact!: EmergencyContacts;

    /* address_id -> One to One -> Candidates contains only one instance Address */
    @OneToOne(() => Addresses)
    @JoinColumn()
    address!: Addresses;

    @Column({
        type: 'nvarchar',
        length: 32
    })
    gender!: string;

    @Column({
        type: 'nvarchar',
        length: 128,
        nullable: true
    })
    religion!: string;

    @Column({
        type: 'nvarchar',
        length: 64,
        nullable: true
    })
    ethnicity!: string;

    @Column({
        type: 'char',
        nullable: true
    })
    blood_type!: string;

    @Column({
        type: 'nvarchar',
        length: 14,
        unique: true
    })
    phone_number!: string;

    @Column({
        type: 'numeric',
        nullable: true
    })
    current_salary!: number;

    @Column({
        type: 'nvarchar',
        length: 128,
        nullable: true
    })
    source_referer!: string;

    @Column({
        type: 'nvarchar',
        length: 512,
        nullable: true
    })
    linkedin_profile_url!: string;
    
    @Column({
        type: 'bit',
        nullable: true,
        default: 0
    })
    is_blacklisted!: boolean;
    
    @CreateDateColumn({
        type: 'datetime'
    })
    created_at!: string;

    @UpdateDateColumn({
        type: 'datetime',
        nullable: true
    })
    updated_at!: string;

    /* Relations */
    // @OneToMany(() => WorkingExperiences, (working_experience) => working_experience.candidate)
    working_experiences!: WorkingExperiences[];

    // @OneToMany(() => Sims, (sim) => sim.candidate)
    sims!: Sims[];

    // @OneToMany(() => Educations, (education) => education.candidate)
    educations!: Educations[];

    @OneToMany(() => Certifications, (certificate) => certificate.candidate)
    certifications!: Certifications[];

    // @OneToMany(() => Familys, (family) => family.candidate)
    families!: Familys[];

    // @OneToMany(() => Documents, (document) => document.candidate)
    // documents!: Documents[];
}