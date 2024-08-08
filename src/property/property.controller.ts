import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import {
  createPropertySchema,
  CreatePropertyZodDto,
} from './dto/createPropertyZod.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';

@Controller('property')
export class PropertyController {
  @Get()
  findAll() {
    return 'All Properties';
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: string,
    @Query('sort', ParseBoolPipe)
    sort: boolean,
  ) {
    console.log(typeof id);
    console.log(typeof sort);
    return id;
  }

  @Post()
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  // @HttpCode(202)
  @UsePipes(new ZodValidationPipe(createPropertySchema))
  create(
    @Body()
    body: CreatePropertyZodDto,
  ) {
    return body;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body() //ini bisa di isi new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, group: ['update'] })
    body: CreatePropertyDto,
  ) {
    return body;
  }
}
