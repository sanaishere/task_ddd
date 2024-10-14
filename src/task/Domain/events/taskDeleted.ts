import { TaskId } from "../TaskId";

export class TaskDeleted {
    constructor(
     public taskId:TaskId,
    ){}
}