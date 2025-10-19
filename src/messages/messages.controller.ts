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
} from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() pagination: any): string {
    const {limit = 10, offset = 10} = pagination;
    return `This action returns all messages | limit=${limit} | offset=${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') params: string): string {
    return `This action returns a message by id ${params}`;
  }

  @Post()
  create(@Body() body: any) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
        id,
        ...body
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a message by id ${id}`;
  }
}
