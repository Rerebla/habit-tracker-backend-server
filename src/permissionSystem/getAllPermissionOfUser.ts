import { arrayPushHelper } from '../utils/arrayPushHelper';
import { splitStringIntoArray } from '../utils/arrayFunctions';
import { checkForUser } from './checkForUser';
import { getPermissionsFromRoles } from './getPermissionsFromRole';

export const getAllPermissionsOfUser = async (userId: number) => {
    const user = await checkForUser(userId);
    const roles = splitStringIntoArray(user.roles);
    const permissions = splitStringIntoArray(user.permissions);
    const rolePermissions = await getPermissionsFromRoles(roles);
    return arrayPushHelper(permissions, rolePermissions);
};