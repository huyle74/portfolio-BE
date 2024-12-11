import { IsOptional, IsString } from 'class-validator';

export class UpdatePortDto {
  @IsOptional()
  @IsString()
  title: string;

  // @IsOptional()
  // @IsString()
  // imageUrl: string;

  @IsOptional()
  @IsString()
  strategy: string;

  @IsOptional()
  @IsString()
  background: string;

  @IsOptional()
  @IsString()
  execution: string;

  @IsOptional()
  @IsString()
  creativeIdea: string;
}
