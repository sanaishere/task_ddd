import { EventHandler } from "src/common/Domain/eventsHandler"
import { TaskId } from "./TaskId"
import { UserId } from "src/user/Domain/UserId"
import { TaskUpdated } from "./events/taskUpdated"
import { TaskDeleted } from "./events/taskDeleted"

export class Task extends EventHandler {
    public taskId:TaskId
    public name :string
    public description:string
    public userId :UserId
    constructor(name:string,description:string,taskId:TaskId,userId:UserId) {
        super()
        this.taskId=taskId
        this.name=name
        this.description=description
        this.userId=userId
    }

    update(name:string|null,description:string|null) {
        if(name){
            this.name=name
        }if(description){
            this.description=description
        }
        this.addToEvents(new TaskUpdated(this.taskId,this.description,this.name))
    }

    delete(id:TaskId) {
     this.addToEvents(new TaskDeleted(id))
    }

}