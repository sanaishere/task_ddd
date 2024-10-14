export class TaskId {
    private id :string
    constructor(taskId:string) {
        this.id=taskId
    }
    static generateGivenId(input:string) {
      return new TaskId(input)
    }
    getId():string {
      return this.id
    }
}