import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateTaskCommand } from "./command";
import { Inject } from "@nestjs/common";
import { TaskRepository } from "../../ports/taskRepository";
import { Task } from "src/task/Domain/Task";
import { NotFound } from "src/common/Domain/exception/notfoundException";
@CommandHandler(UpdateTaskCommand)
export class UpdateTaskCommandHandler implements ICommandHandler<UpdateTaskCommand>{
    constructor(@Inject(TaskRepository) private taskRepository:TaskRepository){}
   async execute(command: UpdateTaskCommand): Promise<any> {
        let task=await this.taskRepository.loadById(command.taskId)
        if(!task) {
        throw new NotFound('task is not found with this id')
        }
        console.log(command)
        let name=command.options?.name?command.options.name:null
        let description=command.options?.description?command.options.description:null
        task.update(name,description)
        await this.taskRepository.save(task)
    }
}