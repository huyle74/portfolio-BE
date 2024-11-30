import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

type People = {
  name: string;
  company: string;
  role: string;
};

type File = {
  filename: string;
  filepath: string;
  mimetype: string;
  size: number;
};

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  imageUrl: string;

  @Column({ type: 'text' })
  strategy: string;

  @Column({ type: 'text' })
  background: string;

  @Column({ type: 'text' })
  execution: string;

  @Column({ type: 'text' })
  creative: string;

  @Column({ type: 'json', nullable: true })
  people: People[];

  @Column({ type: 'json', nullable: true })
  uploadFile: File;
}
