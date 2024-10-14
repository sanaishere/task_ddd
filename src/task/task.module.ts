import { Module } from '@nestjs/common';
import { TaskController } from './Infrastructure/adopters/input/task.controller';
import { createTaskCommandHandler } from './Application/commands/create/createTask.commandHandler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './Infrastructure/adopters/output/task.entity';
import { TaskRepository } from './Application/ports/taskRepository';
import { ModelTaskRepository } from './Infrastructure/adopters/output/task.repository';
import { IDgenerator } from 'src/common/Application/OutputPort/generateId';
import { ID } from 'src/common/Infrastructure/output/Id';
import { TaskMapper } from './Infrastructure/adopters/output/task.mapper';
import { GetMyTasksQueryHandler } from './Application/Queries/getMyTasks/query.handler';
import { GetOneTaskQueryHandler } from './Application/Queries/getOne/query.handler';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { TokenGenerator } from 'src/common/Application/OutputPort/Token';
import { JsonToken } from 'src/common/Infrastructure/output/JsonToken';
import { UpdateTaskCommandHandler } from './Application/commands/update/command.handler';
import { DeleteTaskCommandHandler } from './Application/commands/delete/command.handler';
@Module({
    imports:[
        TypeOrmModule.forFeature([TaskEntity]),
        CqrsModule,
        ConfigModule 
    ],
    providers :[
        {
            provide:TaskRepository,
            useClass:ModelTaskRepository
        },
        {
            provide:IDgenerator,
            useClass:ID
        },{
            provide:TokenGenerator,
            useClass:JsonToken
        },
        createTaskCommandHandler,GetMyTasksQueryHandler,
        GetOneTaskQueryHandler,UpdateTaskCommandHandler,
        DeleteTaskCommandHandler,TaskMapper],
    controllers:[TaskController]
})
export class TaskModule {}
