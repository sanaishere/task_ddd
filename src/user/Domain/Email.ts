import { InvalidInput } from "../../common/Domain/exception/invalidInputs";

export class Email {
  private value:string
  public static errorMessageNotValid='email is not in valid format'
  constructor( email:string) {
    this.value=email
   }

//    static validateEmail(email:string) {
//    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//    const isValid=regex.test(email)
//    return isValid
//    }

//    static getInstance(email:string) {
//     const isValid=Email.validateEmail(email)
//     if(!isValid) {
//         return {error:this.errorMessageNotValid}
//     }
//     return {data :new Email(email)}
//    }

   static fromInput(value:string) :Email {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!regex.test(value)) {
      throw new InvalidInput(this.errorMessageNotValid)
     }
    return new Email(value)
  }

  static fromValid(value:string):Email {
    return new Email(value)
  }

  getValue() {
    return this.value
  }



}