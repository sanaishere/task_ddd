import { Module } from '@nestjs/common';
import { UserController } from './Infrastructure/adopter/input/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Infrastructure/adopter/output/user.entity';
import { Hash } from 'src/common/Application/OutputPort/hash';
import { HashService } from 'src/common/Infrastructure/output/hash';
import { IDgenerator } from 'src/common/Application/OutputPort/generateId';
import { ID } from 'src/common/Infrastructure/output/Id';
import { TokenGenerator } from 'src/common/Application/OutputPort/Token';
import { JsonToken } from 'src/common/Infrastructure/output/JsonToken';
import { UserRepository } from './Application/ports/output/userRepository';
import { ModelUserRepository } from './Infrastructure/adopter/output/userRepository';
import { RegisterCommandHandler } from './Application/command/register.commandHandler';
import { LoginQueryHandler } from './Application/Queries/login.queryHandler';
import { UserMapper } from './Infrastructure/adopter/output/user.mapper';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
@Module({
    imports:[TypeOrmModule.forFeature([UserEntity]),CqrsModule,ConfigModule],
    providers:[
        {
            provide:Hash,
            useClass:HashService
        }, {
            provide:IDgenerator,
            useClass:ID
        },
        {
            provide:TokenGenerator,
            useClass:JsonToken
        },{
            provide:UserRepository,
            useClass:ModelUserRepository
        },
        RegisterCommandHandler,LoginQueryHandler,UserMapper
    ],
    controllers:[UserController]
})
export class UserModule {}
