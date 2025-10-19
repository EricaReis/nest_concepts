import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  private lastId = 1;
  private messages: Message[] = [
    {
      id: 1,
      text: 'This is a message test',
      from: 'Erica',
      to: 'John',
      readed: false,
      date: new Date(),
    },
  ];

  throwNotFoundError() {
    throw new NotFoundException(`Message not found`);
  }

  findAll() {
    return this.messages;
  }

  findOne(id: string) {
    const message = this.messages.find(message => message.id === Number(id));

    if (message) {
      return message;
    }

    this.throwNotFoundError();
  }

  create(createMessageDto: any) {
    this.lastId++;
    const id = this.lastId;
    const newMessage = {
      id,
      ...createMessageDto,
    };
    this.messages.push(newMessage);

    return newMessage;
  }

  update(id: string, body: any) {
    const messageIndex = this.messages.findIndex(item => item.id === +id);

    if (messageIndex < 0) {
      this.throwNotFoundError();
    }

    const message = this.messages[messageIndex];

    this.messages[messageIndex] = {
      ...message,
      ...body,
    };

    return this.messages[messageIndex];
  }

  remove(id: string) {
    const messageIndex = this.messages.findIndex(item => item.id === +id);

    if (messageIndex < 0) {
      this.throwNotFoundError();
    }

    const message = this.messages[messageIndex];

    this.messages.splice(messageIndex, 1);

    return message;
  }
}
