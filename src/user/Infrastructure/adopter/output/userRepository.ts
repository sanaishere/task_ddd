import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "src/user/Application/ports/output/userRepository";
import { User } from "src/user/Domain/User";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UserMapper } from "./user.mapper";
import { Email } from "src/user/Domain/Email";
import { Injectable } from "@nestjs/common";
@Injectable()
export class ModelUserRepository implements UserRepository {
    constructor(@InjectRepository(UserEntity) private userEntity:Repository<UserEntity>,
    private userMapper:UserMapper){}
   async load(): Promise<User[]> {
        const users=await this.userEntity.find({})
        let usersDomain= users.map((user)=>this.userMapper.toDomain(user))
        return usersDomain

    }
   async loadByEmail(email: Email): Promise<User |null> {
        const userRepo=await this.userEntity.findOne({where:{email:email.getValue()}})
        const userDomain=userRepo?this.userMapper.toDomain(userRepo):null
        return userDomain
        
    }

    async save(user: User): Promise<void> {
        const userRepo=this.userMapper.toDbModel(user)
        await this.userEntity.save(userRepo)
    }
    
}