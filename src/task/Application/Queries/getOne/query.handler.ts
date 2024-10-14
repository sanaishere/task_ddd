import { CommandHandler, ICommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetOneTaskQuery } from "./query";
import { Inject } from "@nestjs/common";
import { TaskRepository } from "../../ports/taskRepository";
import { NotFound } from "src/common/Domain/exception/notfoundException";
@QueryHandler(GetOneTaskQuery)
export class GetOneTaskQueryHandler implements IQueryHandler<GetOneTaskQuery> {
    constructor(@Inject(TaskRepository) private taskRepository :TaskRepository){}
    async execute(command: GetOneTaskQuery): Promise<any> {
        const task=await this.taskRepository.loadById(command.taskId)
        if(!task){
            throw new NotFound('task is not found with this id')
        }
        return task
    }
    
}