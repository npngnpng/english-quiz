import { IsPositive } from 'class-validator';

export class EarnCashRequest {
    @IsPositive()
    earnCash: number;
}