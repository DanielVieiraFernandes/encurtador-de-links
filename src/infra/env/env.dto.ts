import { IsNumberString, IsString } from 'class-validator';

export class Env {
  @IsString()
  DATABASE_URL: string;

  @IsNumberString()
  PORT: string;

  @IsString()
  URL: string;
}
