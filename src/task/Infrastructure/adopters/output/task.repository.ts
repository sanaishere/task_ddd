import { InjectRepository } from "@nestjs/typeorm";
import { TaskRepository } from "src/task/Application/ports/taskRepository";
import { Task } from "src/task/Domain/Task";
import { TaskId } from "src/task/Domain/TaskId";
import { UserId } from "src/user/Domain/UserId";
import { TaskEntity } from "./task.entity";
import { Repository } from "typeorm";
import { TaskMapper } from "./task.mapper";
import { Injectable } from "@nestjs/common";
import { TaskDeleted } from "src/task/Domain/events/taskDeleted";
@Injectable()
export class ModelTaskRepository implements TaskRepository {
    constructor(@InjectRepository(TaskEntity) private taskEntity:Repository<TaskEntity>,
    private taskMapper:TaskMapper){}
    async load(): Promise<Task[]> {
       const tasks=await this.taskEntity.find({})
       let tasksDomain=tasks.map((task)=>this.taskMapper.toDomain(task))
       return tasksDomain
    }
    async loadByUser(userId: UserId): Promise<Task[]> {
        const tasks=await this.taskEntity.find
        ({where:
        {uId:userId.getValue()}})
        let taskDomain=tasks.map((task)=>this.taskMapper.toDomain(task))
        return taskDomain
    }
    async save(task: Task): Promise<void> {
        const taskEntity=this.taskMapper.toDbModel(task)
        const events=task.getEvents()
        for (let event of events) {
            console.log(event)
            if(event instanceof TaskDeleted){
              return await this.delete(task.taskId.getId())
            }
        }
        await this.taskEntity.save(taskEntity)
    }
    async loadById(taskId: TaskId): Promise<Task|null> {
       const task=await this.taskEntity.findOne
       ({where:
        {id:taskId.getId()}
    })
       const taskDomain=task?this.taskMapper.toDomain(task):null
       return taskDomain
    }

    async delete(id:string) {
    const task= await this.taskEntity.delete(id)
    console.log(task)
    }
    
}