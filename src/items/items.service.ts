import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/items.entity';
import { Item as ItemInterface } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private itemRepo: Repository<Item>) {}

  async findAll(): Promise<Item[]> {
    return this.itemRepo.find();
  }

  async findOne(id: number): Promise<Item> {
    return this.itemRepo.findOneOrFail({ id: id });
    // return this.itemRepo.findOne({ id: id });
  }

  async create(newItem: ItemInterface): Promise<object> {
    // return await this.itemRepo.insert(newItem); // it returns nothing
    return await this.itemRepo.save(newItem);
  }

  async update(id: number, updateItem: ItemInterface): Promise<any> {
    return await this.itemRepo.update(id, updateItem);
  }

  async delete(id: number): Promise<any> {
    return await this.itemRepo.delete(id);
  }
}
