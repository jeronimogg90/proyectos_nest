import { IsString } from "class-validator"



export class CreateCarDto {

    @IsString({message: `aljsdlfjalsdfjl`})
    readonly brand: string

    @IsString()
    readonly model: string
}