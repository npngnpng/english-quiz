import { IsNotEmpty, MaxLength } from 'class-validator';

export class SolveQuizRequest {
    @IsNotEmpty()
    @MaxLength(20)
    choice: string;
}