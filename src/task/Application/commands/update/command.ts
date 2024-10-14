import { TaskId } from "src/task/Domain/TaskId";
import { UpdateTaskDto } from "src/task/Infrastructure/adopters/input/updateTask.dto";

export class UpdateTaskCommand {
    constructor(
       public taskId:TaskId,
       public options:UpdateTaskDto
    ){
      
    }
}