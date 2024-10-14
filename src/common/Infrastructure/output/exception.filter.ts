import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { existedAlready } from 'src/common/Domain/exception/existedAlready';
import { InvalidInput } from 'src/common/Domain/exception/invalidInputs';
import { NotFound } from 'src/common/Domain/exception/notfoundException';
@Catch(HttpException,Error)
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException , host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const error=exception?.getResponse?exception.getResponse():null
    let status :number=0
    if(exception instanceof existedAlready || exception instanceof InvalidInput){
      status=400
    }else if(exception instanceof NotFound) {
     status=404
    }else {
        status=exception.getStatus?exception.getStatus():500
    }
    console.log(exception)
    const responseToSend={error_code:status,
      error_message:error?error:exception.message||exception,
      errors:error?error['error']:exception['response']}
      console.log("response",responseToSend)
    response
    .status(status)
    .send(responseToSend)
}
}