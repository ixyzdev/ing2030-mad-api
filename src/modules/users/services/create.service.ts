import { Injectable, ConflictException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from '../dto/create-user.dto'
import { User } from '../schemas/user.schema'

@Injectable()
export class CreateUserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) { }

    async execute(dto: CreateUserDto) {
        const emailExists = await this.userModel.findOne({ email: dto.email })
        if (emailExists) {
            throw new ConflictException('El correo ya está registrado')
        }

        const usernameExists = await this.userModel.findOne({ name: dto.name })
        if (usernameExists) {
            throw new ConflictException('El nombre de usuario ya está en uso')
        }

        const hashedPassword = await bcrypt.hash(dto.password, 12)

        const user = await this.userModel.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            age: dto.age ?? null
        })

        const { password, ...safeUser } = user.toObject()
        return safeUser
    }
}
