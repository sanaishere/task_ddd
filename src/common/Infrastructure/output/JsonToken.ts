import { TokenGenerator } from 'src/common/Application/OutputPort/Token'
import * as jwt from 'jsonwebtoken'
import { HttpException, Injectable } from '@nestjs/common'

require('dotenv').config()
export class JsonToken implements TokenGenerator {
    sign(payload: any ,expireIn:string ): string {
        const token=jwt.sign(payload,process.env.JWT_SECRET as jwt.Secret,{expiresIn:expireIn})
        return token
    }
    verify(token: string): any {
        let payload:any
        try{
         payload=jwt.verify(token,process.env.JWT_SECRET as jwt.Secret)
        }catch(error) {
            console.log(error)
            throw new HttpException(error,error.status||401)
        }
        return payload
    }  

}