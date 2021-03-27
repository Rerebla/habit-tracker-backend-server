import { arrayToString, splitStringIntoArray } from '../utils/arrayFunctions';
import { checkForUser } from './checkForUser';

export const removePermission = async (permission: string, userId: number) => {
    const user = await checkForUser(userId);
    const permissionsArray = splitStringIntoArray(user.permissions, ";");
    user.permissions = arrayToString(permissionsArray.filter((e) => {
        return e != permission;
    }, ";"));
    user.save();
};
export const clearAllPermissions = async (userId: number) => {
    const user = await checkForUser(userId);
    user.permissions = "";
    user.save();
};