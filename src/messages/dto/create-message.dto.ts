import {
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMessageDto {
  @IsString({
    message: 'Text must be a string',
  })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly text: string;

  @IsPositive()
  receiverId: number;

  @IsPositive()
  senderId: number;
}
