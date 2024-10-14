import * as bcrypt from 'bcrypt'
import { Hash } from '../../Application/OutputPort/hash'
import { Injectable } from '@nestjs/common'

export class HashService implements Hash {
    hash(password: string): Promise<string> {
        const encyptedPassword= bcrypt.hash(password,10)
        return encyptedPassword
    }
    compare(password: string, hashedPassword: string): Promise<boolean> {
        const isEqual=bcrypt.compare(password,hashedPassword)
        return isEqual
    }
    
}