import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minSymbols: 1,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  password: string;

  @IsOptional()
  @IsDateString()
  birthAt: string;
}
