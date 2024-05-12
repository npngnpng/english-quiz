import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateWordRequest {
    @IsNotEmpty()
    @MaxLength(20)
    korean: string;

    @IsNotEmpty()
    @MaxLength(50)
    english: string;
}

export class UpdateWordRequest {
    @IsNotEmpty()
    @MaxLength(20)
    korean: string;

    @IsNotEmpty()
    @MaxLength(50)
    english: string;
}