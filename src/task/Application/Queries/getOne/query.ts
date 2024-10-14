import { TaskId } from "src/task/Domain/TaskId";
export class GetOneTaskQuery {
    constructor(
        public taskId:TaskId
    ){}
}