import { IsArray, IsString, IsObject, IsOptional } from 'class-validator';

type People = {
  name: string;
  role: string;
  company: string;
};

export class createPortDto {
  @IsString()
  title: string;

  @IsString()
  strategy: string;

  @IsString()
  background: string;

  @IsString()
  execution: string;

  @IsString()
  creative: string;

  @IsArray()
  @IsOptional()
  people: People[];

  @IsString()
  @IsOptional()
  uploadFile: string;
}
