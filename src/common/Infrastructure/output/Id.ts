import { Injectable } from "@nestjs/common";
import { IDgenerator } from "../../Application/OutputPort/generateId";
import {v4 as uuidv4} from 'uuid';

export class ID implements IDgenerator {
    generate(): string {
        const uId=uuidv4()
        return uId
    }

}