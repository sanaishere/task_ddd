export const Hash=Symbol('Hash').valueOf()
export interface Hash {
    hash(password:string): Promise<string>
    compare(password:string,hashedPassword:string): Promise<boolean>
}