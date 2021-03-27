import Role from '../entity/role';
import { arrayPushHelper } from '../utils/arrayPushHelper';
import { splitStringIntoArray } from '../utils/arrayFunctions';

export const getPermissionsFromRole = async (roleName: string) => {
    const role = await Role.findOne({ roleName: roleName });
    if (!role) throw new Error("Role not found! Rolename: " + roleName);
    return splitStringIntoArray(role.permissions);
};

export const getPermissionsFromRoles = async (roleNames: string[]) => {
    let permissions: string[] = [];
    for (let index = 0; index < roleNames.length; index++) {
        const role = roleNames[index];
        permissions = arrayPushHelper(permissions, await getPermissionsFromRole(role));
    }
    return permissions;
};