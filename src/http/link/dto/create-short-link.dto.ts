import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateShortLink {
  @ApiProperty()
  @IsString()
  originalLink: string;
}
