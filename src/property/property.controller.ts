import {
  Body,
  Controller,
  Get,
  // Headers,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import {
  createPropertySchema,
  CreatePropertyZodDto,
} from './dto/createPropertyZod.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';

@Controller('property')
export class PropertyController {
  @Get()
  findAll() {
    return 'All Properties';
  }

  @Get(':id')
  findOne(
    // ini menggunakan pipe untuk mengkonversi param dan query
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
  // @HttpCode(202)
  // ini dekorator untuk menggunakan pipe, jika tidak menggunakan ini validasi tidak jalan
  @UsePipes(new ZodValidationPipe(createPropertySchema))
  create(
    // bisa langsung di isi pipe
    @Body()
    body: CreatePropertyZodDto,
  ) {
    return body;
  }

  // ini tidak menggunakan usePipes() karena menggunakan module validation
  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body() //ini bisa diisi pipe seperti new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, group: ['update'] })
    body: CreatePropertyDto, // karena ini pake module validation, group-nya jadi create walaupun ini update
    @RequestHeader(
      new ValidationPipe({
        validateCustomDecorators: true,
      }), // validateCustomDecorators ini buat validasi header, jika ini false, validasi header tidak jalan
    )
    header: HeadersDto,
  ) {
    return header;
  }
}
