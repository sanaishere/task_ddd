import {IQueryHandler,QueryHandler} from '@nestjs/cqrs'
import { LoginQuery } from './login.query';
import { Inject } from '@nestjs/common';
import { UserRepository } from '../ports/output/userRepository';
import { Hash } from 'src/common/Application/OutputPort/hash';
import { TokenGenerator } from 'src/common/Application/OutputPort/Token';
import { Email } from 'src/user/Domain/Email';
import { Password } from 'src/user/Domain/Password';
import { NotFound } from 'src/common/Domain/exception/notfoundException';
import { InvalidInput } from 'src/common/Domain/exception/invalidInputs';
import { UserId } from 'src/user/Domain/UserId';
@QueryHandler(LoginQuery)
export class LoginQueryHandler implements IQueryHandler<LoginQuery> {
    USER_NOT_FOUND='user with this email is not found'
    PASSWORD_NOT_CORRECT=' password is not correct'
    constructor( @Inject(UserRepository) private userRepository:UserRepository,
       @Inject(Hash) private hashService :Hash,
       @Inject(TokenGenerator) private tokenGenerator:TokenGenerator
    ) {}
   async execute(query: LoginQuery): Promise<any> {
      let validateEmail=Email.fromInput(query.email)
      let validatePassword=Password.fromInput(query.password) 
      let existsUserWitEmail=await this.userRepository.loadByEmail(validateEmail)
      if(!existsUserWitEmail) {
         throw new NotFound('user is not found with this email')
      }
      let isPasswordCorrect=await this.hashService.compare(query.password,
        existsUserWitEmail.password.getValue())
      if(!isPasswordCorrect) {
        throw new InvalidInput('password is not correct')
      }
      const token= this.tokenGenerator.sign({userId:existsUserWitEmail.userId.getValue()
        ,email:existsUserWitEmail.email},
        '2h'
      )
      return {data:existsUserWitEmail,token}
    }
    
}