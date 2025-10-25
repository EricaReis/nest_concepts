import { IsEmail } from 'class-validator';
import { Message } from 'src/messages/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  // One person can send many messages
  @OneToMany(() => Message, message => message.sender)
  sentMessages: Message[];

  // One person can receive many messages
  @OneToMany(() => Message, message => message.receiver)
  receivedMessages: Message[];
}
