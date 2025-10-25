import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    try {
      const personData = {
        name: createPersonDto.name,
        passwordHash: createPersonDto.password,
        email: createPersonDto.email,
      };

      const newPerson = this.peopleRepository.create(personData);
      await this.peopleRepository.save(newPerson);

      return newPerson;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  findAll() {
    const people = this.peopleRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return people;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const personData = {
      name: updatePersonDto?.name,
      passwordHash: updatePersonDto?.password,
      email: updatePersonDto?.email,
    };

    const person = await this.peopleRepository.preload({
      id: id,
      ...personData,
    });

    if (!person) {
      throw new NotFoundException(`Person not found`);
    }

    return this.peopleRepository.save(person);
  }

  async remove(id: number) {
    const person = await this.peopleRepository.findOneBy({ id });

    if (!person) {
      throw new NotFoundException(`Person not found`);
    }

    return this.peopleRepository.remove(person);
  }
}
