import { TaskId } from "src/task/Domain/TaskId";
export class DeleteTaskCommand{
    constructor(
        public taskId:TaskId
    ){}
}