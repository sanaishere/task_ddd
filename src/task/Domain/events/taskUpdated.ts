import { TaskId } from "../TaskId";

export class TaskUpdated {
    constructor(
     public taskId:TaskId,
     public description:string,
     public name:string
    ){}
}