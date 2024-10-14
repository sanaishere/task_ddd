import { InvalidInput } from "../../common/Domain/exception/invalidInputs"

export class Password {
    private value :string
    static regex=/^(?=.*[a-z])(?=.*[A-Z]).+$/
    static wordsError='password should contain upperCase and lowerCase '
    static lengthError='password length should be greater than 8'
    constructor(password:string) {
       this.value=password
    }

    // static validate(password:string) {
    //   if(password.length<8 && !this.regex.test(value)) {
    //     throw new InvalidPassword(`${this.lengthError} or ${this.wordsError}`)
    //    }
    //  return {data:password}
    // }

    // static getInstance(password:string) {
    //     return {data:new Password(password)}
    // }

    static fromInput(value:string) :Password {
      if(value.length<8 && !this.regex.test(value)) {
        throw new InvalidInput(`${this.lengthError} or ${this.wordsError}`)
       }
      return new Password(value)
    }

    static fromValid(value:string):Password {
      return new Password(value)
    }

    getValue() {
      return this.value
    }



}