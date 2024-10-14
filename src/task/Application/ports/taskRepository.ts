import { Task } from "src/task/Domain/Task";
import { TaskId } from "src/task/Domain/TaskId";
import { UserId } from "src/user/Domain/UserId";
export const TaskRepository=Symbol('TaskRepository').valueOf()
export interface TaskRepository {
    load() :Promise<Task[]>
    loadByUser(userId:UserId) :Promise<Task[]>
    save(task:Task) :Promise<void>
    loadById(taskId:TaskId) :Promise<Task|null>
}