import { UserId } from "src/user/Domain/UserId";

export class CreateTaskCommand {
 constructor(
    public name:string,
    public description :string,
    public userId:UserId
 ) {

 }
}