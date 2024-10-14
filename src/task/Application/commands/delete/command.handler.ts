import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { DeleteTaskCommand } from "./command"
import { TaskRepository } from "../../ports/taskRepository"
import { Inject } from "@nestjs/common"
import { NotFound } from "src/common/Domain/exception/notfoundException"
@CommandHandler(DeleteTaskCommand)
export class DeleteTaskCommandHandler implements ICommandHandler<DeleteTaskCommand>{
    constructor(@Inject(TaskRepository) private taskRepository:TaskRepository){}
   async execute(command: DeleteTaskCommand): Promise<any> {
        let task=await this.taskRepository.loadById(command.taskId)
        if(!task) {
        throw new NotFound('task is not found with this id')
        }
        task.delete(task.taskId)
        await this.taskRepository.save(task)
    }
    

}