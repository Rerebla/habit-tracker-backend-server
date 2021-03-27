import bcrypt from 'bcrypt'
export default async function checkHash(plainTextPassword: string, passwordHash: string) {
    return await bcrypt.compare(plainTextPassword, passwordHash);
}