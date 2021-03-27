import { splitStringIntoArray } from '../utils/arrayFunctions';
import { checkForUser } from './checkForUser';

export const getPermissionsOfUser = async (userId: number) => {
    const user = await checkForUser(userId);
    return splitStringIntoArray(user.permissions, ";");
};

export const checkPermissionOfUser = async (permission: string, userId: number) => {
    const user = await checkForUser(userId);

    const permissionsArray = splitStringIntoArray(user.permissions, ";");
    return permissionsArray.includes(permission);
};