import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/user/Domain/User";
import { Task } from "../../../Domain/Task";
import { IDgenerator } from "src/common/Application/OutputPort/generateId";
import { TaskId } from "../../../Domain/TaskId";
import { TaskRepository } from "../../ports/taskRepository";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateTaskCommand } from "./createTask.command";
import { UserId } from "src/user/Domain/UserId";
@CommandHandler(CreateTaskCommand)
export class createTaskCommandHandler implements ICommandHandler<CreateTaskCommand> {
   constructor(
   @Inject(TaskRepository) private taskRepository :TaskRepository,
   @Inject(IDgenerator) private readonly idGenerator:IDgenerator) {}
   async execute(command: CreateTaskCommand): Promise<any> {
      const taskId=this.idGenerator.generate()
      const task=new Task(command.name,command.description,new TaskId(taskId),command.userId )
      const userId=task.userId 
      await this.taskRepository.save(task)
      return {data:'task is created'}
   }
   
}