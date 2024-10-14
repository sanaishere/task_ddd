import { UserId } from "src/user/Domain/UserId";
import { UserEntity } from "src/user/Infrastructure/adopter/output/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('task')
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    description:string

   @ManyToOne(()=>UserEntity,user=>user.tasks)
    user:UserEntity

    @Column()
    uId:string
}