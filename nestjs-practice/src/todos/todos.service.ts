import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.create(createTodoDto).save();
    return todo;
  }

  async findAll(): Promise<Todo[]> {
    const todos = await this.todoRepository.find();
    return todos;
  }

  async findOne(id: string) {
    const todo: Todo = await this.todoRepository.findOne(id);
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    await this.todoRepository.update(id, updateTodoDto);
    const todo: Todo = await this.todoRepository.findOne(id);
    return todo;
  }

  async remove(id: string) {
    this.todoRepository.delete(id);
    return;
  }
}
