import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class InivtationCreateRequest {
  @MaxLength(50)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  code: string;
}
