import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('create new user with ID: ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Remove user with ID: ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Update Info user with ID: ', this.id);
  }
}
