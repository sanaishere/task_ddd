import { Controller, Post, UseGuards, Request, Body, Query, Get, Param, Patch, Delete } from "@nestjs/common"
import { AuthGuard } from "src/common/Infrastructure/input/auth.guard"
import { CreateTaskDto } from "./task.dto"
import { TaskId } from "src/task/Domain/TaskId"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateTaskCommand } from "src/task/Application/commands/create/createTask.command"
import { GetMyTasksQuery} from "src/task/Application/Queries/getMyTasks/query"
import { GetOneTaskQuery } from "src/task/Application/Queries/getOne/query"
import { UpdateTaskCommand } from "src/task/Application/commands/update/command"
import { UpdateTaskDto } from "./updateTask.dto"
import { DeleteTaskCommand } from "src/task/Application/commands/delete/command"

@Controller('task')
export class TaskController {
    constructor(private commandBus:CommandBus,
      private queryBus:QueryBus
    ) {}
    @UseGuards(AuthGuard)
    @Post('create')
    async create(@Request() {userId},@Body() body:CreateTaskDto) {
     return await this.commandBus.execute(new CreateTaskCommand(body.name,body.description,userId))
    }

    @UseGuards(AuthGuard)
    @Get('getMyTasks')
    async getListOfTasks(@Request() {userId}) {
       return await this.queryBus.execute<GetMyTasksQuery>(new GetMyTasksQuery(userId))
    }

    @UseGuards(AuthGuard)
    @Get('getOne/:id')
    async getOneTask(@Param('id') id:string,@Request() {user}) {
      return await this.queryBus.execute<GetOneTaskQuery>
      (new GetOneTaskQuery(TaskId.generateGivenId(id)))
    }

    @UseGuards(AuthGuard)
    @Patch('update/:id')
    async update(@Param('id') id:string,@Body() options:UpdateTaskDto){
      console.log(options)
      return await this.commandBus.execute(new UpdateTaskCommand(new TaskId(id),options))
    }

    @UseGuards(AuthGuard)
    @Delete('delete/:id')
    async delete(@Param('id') id:string){
      return await this.commandBus.execute(new DeleteTaskCommand(new TaskId(id)))
    }
}