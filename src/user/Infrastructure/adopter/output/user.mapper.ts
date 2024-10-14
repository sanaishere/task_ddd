import { User } from "src/user/Domain/User";
import { UserEntity } from "./user.entity";
import { Email } from "src/user/Domain/Email";
import { Password } from "src/user/Domain/Password";
import { UserId } from "src/user/Domain/UserId";
import { Injectable } from "@nestjs/common";
@Injectable()
export class UserMapper {
     toDomain(user:UserEntity) :User {
      const domain= new User(
        new Email(user.email),
        // new Password(user.password),
        Password.fromValid(user.password),
        user.userName,
        new UserId(user.id)
      )
      return domain
    }

     toDbModel(user:User) :UserEntity{
      const userEntity=new UserEntity()
      userEntity.id=user.userId.getValue()
      userEntity.email=user.email.getValue()
      userEntity.password=user.password.getValue()
      userEntity.userName=user.userName
      return userEntity
    }
}