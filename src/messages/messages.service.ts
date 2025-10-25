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

  async create(createMessageDto: CreateMessageDto) {
    const newMessage = {
      ...createMessageDto,
      wasRead: false,
      date: new Date(),
    };

    const message = this.messageRepository.create(newMessage);

    return this.messageRepository.save(message);
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const partialUpdateMessage = {
      wasRead: updateMessageDto?.wasRead,
      text: updateMessageDto?.text,
    };
    const message = await this.messageRepository.preload({
      id,
      ...partialUpdateMessage,
    });

    if (!message) {
      throw new Error(`Message ${id} not found`);
    }

    await this.messageRepository.save(message);

    return message;
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOne({ where: { id } });

    if (!message) {
      throw new Error(`Message ${id} not found`);
    }

    return this.messageRepository.remove(message);
  }
}
