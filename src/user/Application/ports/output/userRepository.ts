import { Email } from "src/user/Domain/Email";
import { User } from "src/user/Domain/User";
export const UserRepository=Symbol('UserRepository')
export interface UserRepository {
    load() :Promise<User[]>
    loadByEmail(email:Email):Promise<User | null>
    save(user:User) :Promise<void>

}