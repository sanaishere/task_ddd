import { TaskEntity } from "src/task/Infrastructure/adopters/output/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    userName:string

    @OneToMany(()=>TaskEntity,task=>task.user)
     tasks:TaskEntity[]
}