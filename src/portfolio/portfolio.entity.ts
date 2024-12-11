import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

type People = {
  name: string;
  company: string;
  role: string;
};

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  uploadFile: string;

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
}
