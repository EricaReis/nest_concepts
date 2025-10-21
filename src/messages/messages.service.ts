import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  private lastId = 1;
  private messages: Message[] = [
    {
      id: 1,
      text: 'This is a message test',
      from: 'Erica',
      to: 'John',
      wasRead: false,
      date: new Date(),
    },
  ];

  throwNotFoundError() {
    throw new NotFoundException(`Message not found`);
  }

  async findAll() {
    const messages = await this.messageRepository.find();

    return messages;
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: { id },
    });

    if (message) {
      return message;
    }

    this.throwNotFoundError();
  }

  create(createMessageDto: CreateMessageDto) {
    this.lastId++;
    const id = this.lastId;
    const newMessage = {
      id,
      ...createMessageDto,
      wasRead: false,
      date: new Date(),
    };
    this.messages.push(newMessage);

    return newMessage;
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
    const messageIndex = this.messages.findIndex(item => item.id === +id);

    if (messageIndex < 0) {
      this.throwNotFoundError();
    }

    const message = this.messages[messageIndex];

    this.messages[messageIndex] = {
      ...message,
      ...updateMessageDto,
    };

    return this.messages[messageIndex];
  }

  remove(id: number) {
    const messageIndex = this.messages.findIndex(item => item.id === +id);

    if (messageIndex < 0) {
      this.throwNotFoundError();
    }

    const message = this.messages[messageIndex];

    this.messages.splice(messageIndex, 1);

    return message;
  }
}
