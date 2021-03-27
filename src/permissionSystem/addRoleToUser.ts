import { In } from 'typeorm';
import Role from '../entity/role';
import { arrayToString } from '../utils/arrayFunctions';
import { checkForUser } from './checkForUser';

export const addRoleToUser = async (roleName: string, userId: number) => {
    const user = await checkForUser(userId);
    const role = await Role.findOne({ roleName: roleName });
    if (!role) throw new Error("Role not found! Name: " + roleName);
    user.roles += roleName.endsWith(";") ? roleName : roleName + ";";
    user.save();
};

export const addRolesToUser = async (roleNames: string[], userId: number) => {
    const user = await checkForUser(userId);
    const { "1": number } = await Role.findAndCount({ roleName: In(roleNames) });
    if (number < roleNames.length) throw new Error("Some role doesn't exist of roles" + roleNames);
    const rolesString = arrayToString(roleNames);
    user.roles += rolesString;
    user.save();
};