import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleService } from 'src/people/people.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly peopleService: PeopleService,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException(`Message not found`);
  }

  async findAll(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto ?? {};

    const messages = await this.messageRepository.find({
      take: limit,
      skip: offset,
      relations: ['sender', 'receiver'],
      order: {
        id: 'DESC',
      },
      select: {
        sender: {
          id: true,
          name: true,
        },
        receiver: {
          id: true,
          name: true,
        },
      },
    });

    return messages;
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['sender', 'receiver'],
      select: {
        sender: {
          id: true,
          name: true,
        },
        receiver: {
          id: true,
          name: true,
        },
      },
    });

    if (message) {
      return message;
    }

    this.throwNotFoundError();
  }

  async create(createMessageDto: CreateMessageDto) {
    const { senderId, receiverId } = createMessageDto;
    //find the person who is sending the message
    const sender = await this.peopleService.findOne(senderId);

    //find the person who is receiving the message
    const receiver = await this.peopleService.findOne(receiverId);

    const newMessage = {
      text: createMessageDto.text,
      sender,
      receiver,
      wasRead: false,
      date: new Date(),
    };

    const message = this.messageRepository.create(newMessage);

    await this.messageRepository.save(message);

    return {
      ...message,
      sender: {
        id: message.sender.id,
      },
      receiver: {
        id: message.receiver.id,
      },
    };
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = await this.findOne(id);

    if (!message) {
      throw new Error(`Message ${id} not found`);
    }

    message.text = updateMessageDto?.text ?? message.text;
    message.wasRead = updateMessageDto?.wasRead ?? message.wasRead;

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
