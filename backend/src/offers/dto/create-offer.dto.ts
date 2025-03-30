import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  status: string; // ör: "Beklemede", "Kabul Edildi"

  @IsNotEmpty()
  @IsDateString()
  offer_date: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
