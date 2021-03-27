import bcrypt from 'bcrypt'
export default async function makeHash(saltRounds: number, plainTextPassword: string): Promise<string> {
    return await bcrypt.hash(plainTextPassword, saltRounds)
}