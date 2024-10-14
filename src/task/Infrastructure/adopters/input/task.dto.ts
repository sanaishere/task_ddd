import { IsNotEmpty, IsString } from "@nestjs/class-validator"

export class CreateTaskDto{
    name:string
   description:string
}