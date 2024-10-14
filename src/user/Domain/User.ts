import { Email } from "./Email"
import { Password } from "./Password"
import { UserId } from "./UserId"

export class User {
    constructor(
      public email:Email,
      public password:Password,
      public userName:string,
      public userId:UserId
    ){}

    //  registerUser(password:Password,email:Email,userName:string,userId:UserId) {
    //    this.email=email
    //    this.userName=userName
    //    this.password=password
    //    this.userId=userId
    // }
}