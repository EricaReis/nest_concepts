import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
import { AuthTokenInterceptor } from 'src/common/interceptors/auth-token.interceptor';
import type { Request } from 'express';

@Controller('messages')
@UseInterceptors(AuthTokenInterceptor)
@UsePipes(ParseIntIdPipe)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto, @Req() req: Request) {
    console.log('MessageController', req['user']);

    const messages = await this.messagesService.findAll(paginationDto);
    return messages;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.messagesService.findOne(id);
  }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.messagesService.remove(id);
  }
}
