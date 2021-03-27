import { arrayToString } from '../utils/arrayFunctions';
import { checkForUser } from './checkForUser';

export const addRoleToUser = async (role: string, userId: number) => {
    const user = await checkForUser(userId);
    user.roles += role.endsWith(";") ? role : role + ";";
    user.save();
};

export const addRolesToUser = async (roles: string[], userId: number) => {
    const user = await checkForUser(userId);
    const rolesString = arrayToString(roles);
    user.roles += rolesString;
    user.save();
};