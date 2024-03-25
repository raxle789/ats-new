type TypeUserPermissions = {
    is_custome_roles?: boolean;
    roles: string;
    permissions?: string[];
}

type TypePermissions = {
    roles: string[];
    pre_defined_permissions: {
        candidates: string[],
        talent_aquisitions: string[]
    },
    list_permissions: string[];
}

const _PERMISSIONS: TypePermissions = {
    roles: ['candidates', 'talent_aquisitions'],
    pre_defined_permissions: {
        candidates: [
            'erajaya.jobs.list',
            'erajaya.jobs.detail',
            'erajaya.jobs.apply',
            'erajaya.jobs.acceptJobOffer',
            'erajaya.jobs.assessment'
        ],
        talent_aquisitions: [
            'erajaya.candidates.list',
            'erajaya.candidates.detail'
        ]
    },
    list_permissions: [
        /* Candidates */
        'erajaya.jobs.list',
        'erajaya.jobs.detail',
        'erajaya.jobs.apply',
        'erajaya.jobs.acceptJobOffer',
        'erajaya.jobs.assessment',
        /* Talent Aquisitions */
        'erajaya.candidates.list',
        'erajaya.candidates.detail'
    ]
};

export type { TypeUserPermissions };
export default _PERMISSIONS;