import { arrayToString } from '../utils/arrayFunctions';
import { checkForUser } from './checkForUser';

export const addPermissionToUser = async (permission: string, userId: number) => {
    const user = await checkForUser(userId);

    if (!permission.endsWith(";")) permission += ";";
    user.permissions += permission;
    await user.save();
    return user.permissions;
};

export const addPermissionsToUser = async (permissions: string[], userId: number) => {
    const user = await checkForUser(userId);
    user.permissions += arrayToString(permissions, ";");
    user.save();
    return user.permissions;
};