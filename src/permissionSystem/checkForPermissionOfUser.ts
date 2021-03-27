import { getAllPermissionsOfUser } from './getAllPermissionOfUser';
import { getRolesOfUser } from './getRolesOfUser';

export const checkForPermissionOfUser = async (neededPermission: string, userId: number) => {
    const permissions = await getAllPermissionsOfUser(userId);
    return permissions.includes(neededPermission);
};
export const checkForRoleOfUser = async (neededRole: string, userId: number) => {
    const roles = await getRolesOfUser(userId);
    return roles.includes(neededRole);
};
export const checkForPermissionsOfUser = async (neededPermissions: string[], userId: number) => {
    const permissions = await getAllPermissionsOfUser(userId);
    return neededPermissions.every(elem => permissions.includes(elem));
};

export const checkForRolesOfUser = async (neededRoles: string[], userId: number) => {
    const roles = await getRolesOfUser(userId);
    return neededRoles.every(elem => roles.includes(elem));
};