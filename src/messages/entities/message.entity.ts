import { Person } from 'src/people/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  text: string;

  // many messages can be from one person
  @ManyToOne(() => Person)
  // specify the foreign key
  @JoinColumn({ name: 'from' })
  from: Person;

  // many messages can be to one person
  @ManyToOne(() => Person)
  @JoinColumn({ name: 'to' })
  to: Person;

  @Column({ default: false })
  wasRead: boolean;

  @Column()
  date: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
