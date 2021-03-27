import User from '../entity/user';

export const checkForUser = async (userId: number): Promise<User> => {
    const user = await User.findOne(userId);
    if (user) return user;
    throw new Error("User not found! ID: " + userId);
};