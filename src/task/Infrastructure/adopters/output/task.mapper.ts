import { Task } from "src/task/Domain/Task"
import { TaskEntity } from "./task.entity"
import { TaskId } from "src/task/Domain/TaskId"
import { UserId } from "src/user/Domain/UserId"
import { Injectable } from "@nestjs/common"
import { UserEntity } from "src/user/Infrastructure/adopter/output/user.entity"
@Injectable()
export class TaskMapper {
    toDomain(task:TaskEntity) :Task {
     const domain= new Task(
       task.name,
       task.description,
       TaskId.generateGivenId(task.id),
       new UserId(task.uId)
     )
     return domain
   }

    toDbModel(task:Task) :TaskEntity{
     const taskEntity=new TaskEntity()
     taskEntity.id=task.taskId.getId()
     taskEntity.name=task.name
     taskEntity.description=task.description
     taskEntity.uId=task.userId.getValue()
     return taskEntity
   }
}