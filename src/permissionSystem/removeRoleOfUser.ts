import { arrayToString, splitStringIntoArray } from '../utils/arrayFunctions';
import { checkForUser } from './checkForUser';

export const removeRoleOfUser = async (role: string, userId: number) => {
    const user = await checkForUser(userId);
    const roleArray = splitStringIntoArray(user.roles, ";");
    user.roles = arrayToString(roleArray.filter((e) => {
        return e != role;
    }, ";"));
    user.save();
};

export const clearAllRoles = async (userId: number) => {
    const user = await checkForUser(userId);
    user.roles = "";
    user.save();
};