import { IsArray, IsString } from 'class-validator';

type People = {
  name: string;
  role: string;
  company: string;
};

export class createPortDto {
  @IsString()
  title: string;

  @IsString()
  imageUrl: string;

  @IsString()
  strategy: string;

  @IsString()
  background: string;

  @IsString() 
  execution: string;

  @IsString()
  creative: string;

  @IsArray()
  people: People[];
}
