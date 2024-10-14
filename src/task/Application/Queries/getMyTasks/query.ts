import { Inject } from "@nestjs/common";
import { TaskRepository } from "../../ports/taskRepository";
import { UserId } from "src/user/Domain/UserId";

export class GetMyTasksQuery {
    constructor(
     public userId:UserId
    ){}
}