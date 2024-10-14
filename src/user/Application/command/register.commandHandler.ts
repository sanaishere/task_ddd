import {ICommandHandler,CommandHandler} from '@nestjs/cqrs'
import { RegisterCommand } from './register.commnd';
import { Email } from 'src/user/Domain/Email';
import { Password } from 'src/user/Domain/Password';
import { UserRepository } from '../ports/output/userRepository';
import { Hash } from 'src/common/Application/OutputPort/hash';
import { IDgenerator } from 'src/common/Application/OutputPort/generateId';
import { Inject } from '@nestjs/common';
import { User } from 'src/user/Domain/User';
import { UserId } from 'src/user/Domain/UserId';
import { existedAlready } from 'src/common/Domain/exception/existedAlready';
@CommandHandler(RegisterCommand)
export class RegisterCommandHandler implements ICommandHandler <RegisterCommand> {
    duplicateUser='user exists with this email'
    constructor( @Inject(UserRepository) private userRepository:UserRepository,
        @Inject(Hash) private hashService :Hash,
        @Inject(IDgenerator) private readonly idGenerator:IDgenerator
    ) {}
   async execute(command: RegisterCommand): Promise<any> {
      let emailResult=Email.fromInput(command.email)
      let passwordResult=Password.fromInput(command.password)
      const existsUserWitEmail=await this.userRepository.loadByEmail(emailResult)
      if(existsUserWitEmail) {
        throw new existedAlready('user already existed with this email')
      }
      const userId=this.idGenerator.generate()
      const hashedPassword=await this.hashService.hash(passwordResult.getValue())
      const user :User = new User(emailResult,Password.fromValid(hashedPassword),
      command.userName,new UserId(userId))
      await this.userRepository.save(user)
      return {data:user}
    }
    }
    