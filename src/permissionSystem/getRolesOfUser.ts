import { splitStringIntoArray } from '../utils/arrayFunctions';
import { checkForUser } from './checkForUser';

export const getRolesOfUser = async (userId: number) => {
    const user = await checkForUser(userId);
    return splitStringIntoArray(user.roles);
};