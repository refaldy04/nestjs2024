import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

@Controller('property')
export class PropertyController {
  @Get()
  findAll() {
    return 'All Properties';
  }

  @Get(':id/:slug')
  findOne(@Param('id') id: string, @Param('slug') slug: string) {
    return `id = ${id}, slug = ${slug}`;
  }

  @Post()
  @HttpCode(202)
  create(@Body('name') name) {
    return name;
  }
}
