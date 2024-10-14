import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { TokenGenerator } from "src/common/Application/OutputPort/Token";
import { UserId } from "src/user/Domain/UserId";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(@Inject(TokenGenerator) private tokenService:TokenGenerator,
    ){}
   async canActivate(context: ExecutionContext){
        let req= context.switchToHttp().getRequest()
        const authorization=await req.headers.authorization
        if(!authorization){
            console.log('erroring')
            throw new HttpException('you should register first',HttpStatus.UNAUTHORIZED)
        }
        const accessToken=authorization?.split(' ')[1]
        console.log(accessToken)
       
      
        try{
        const payload=this.tokenService.verify(accessToken)
        if(payload.error) {
           return false
        }
        const userId=new UserId(payload['userId'])
        req.userId=userId 
        console.log("user ",req.userId)
         
        }
        catch(err){
            console.log("error",err)
            if(err.message==='jwt expired'){
            throw new HttpException('you should login again',HttpStatus.UNAUTHORIZED)
            }else{
                console.log(err)
            throw new HttpException(err,err.status||HttpStatus.BAD_GATEWAY)
        }
        
    }
    return true
    }
    
}