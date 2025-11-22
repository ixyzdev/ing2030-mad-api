import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    email: string

    @ApiProperty({ required: false })
    age?: number

    @ApiProperty()
    createdAt: Date
}
