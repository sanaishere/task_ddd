import { CommandHandler, ICommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMyTasksQuery } from "./query";
import { TaskRepository } from "../../ports/taskRepository";
import { Inject } from "@nestjs/common";
@QueryHandler(GetMyTasksQuery)
export class GetMyTasksQueryHandler implements IQueryHandler<GetMyTasksQuery> {
    constructor(@Inject(TaskRepository) private taskRepository :TaskRepository,){}
   async execute(query: GetMyTasksQuery): Promise<any> {
        const tasks=await this.taskRepository.loadByUser(query.userId)
        return tasks
    }

}