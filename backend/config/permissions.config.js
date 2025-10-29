const PERMISSIONS ={
    admin:[
        'update_tenant',
        'manage_users',
        'create_room',
        'view_rooms',
        'update_room',
        'delete_room',
        'create_tenant',
        'view_tenants',
        'update_tenant',
        'delete_tenant',
        'create_owner',
        'view_owners',
        'update_owner',
        'delete_owner',
        'view-self',
        'update-self'
    ],
    tenant:[
        'view_rooms',
        'view_tenants',
        'update_room',
        'update_tenant',
        'view-self',
        'update-self',
        'view_owners'
        
    ],
    owner:[
        
        'view_rooms',
        'assign_room',
        'view-self',
        'update_room',
        'view_tenants',
        'view_tenant',
        'update-self',
        'create_room',
        'update_room',
        'delete_room'
    ],
}

module.exports=PERMISSIONS;