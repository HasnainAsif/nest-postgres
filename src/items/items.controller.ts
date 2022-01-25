import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateItemDTO } from './dto/create-item.dto';
import { Item } from './entities/items.entity';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get() // default status is 200
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get('/:id') // default status is 200
  findOne(@Param() param: any): Promise<Item> {
    return this.itemsService.findOne(param.id);
  }

  @Post() // default status is 201
  @HttpCode(201)
  create(@Body() newItem: CreateItemDTO): Promise<object> {
    return this.itemsService.create(newItem);
  }

  @Put(':id') // default status is 200
  async update(
    @Param('id') id: number,
    @Body() updateItem: CreateItemDTO,
  ): Promise<string> {
    await this.itemsService.findOne(id); // it will through 500 error if item is not available
    // if (!item) {
    //   return 'Item not found';
    // }
    const itemUpdated = await this.itemsService.update(id, updateItem);
    if (!itemUpdated.affected) {
      return 'Item not updated';
    }
    return 'Item updated successfully';
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    await this.itemsService.findOne(id); // it will through 500 error if item is not available

    const res = await this.itemsService.delete(id);
    if (!res.affected) {
      return 'Item not deleted';
    }
    return 'Item deleted successfully';
  }

  @Get('query')
  findAllWithQueryParams(@Query() query): string {
    // console.log(query);
    return 'Get items by query params';
  }

  @Get('express-style')
  findAllExpressStyle(@Req() req: Request, @Res() res: Response): Response {
    // console.log(req.url);
    return res.send('Get all items in express style');
  }
}
