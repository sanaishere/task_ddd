import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterCommand } from 'src/user/Application/command/register.commnd';
import { LoginQuery } from 'src/user/Application/Queries/login.query';

@Controller('auth')
export class UserController {
    constructor(private commandBus:CommandBus,
        private queryBus :QueryBus
    ){}
    @Post('signUp')
    async signUp(@Body() signUpInput:RegisterDto) {
        return await this.commandBus.execute<RegisterCommand>(new RegisterCommand(signUpInput.userName,
            signUpInput.password,signUpInput.email))
    }

    @Post('login')
    async login(@Body() loginInput:LoginDto) {
       return await this.queryBus.execute<LoginQuery>(new LoginQuery(loginInput.email,loginInput.password))
    }

}