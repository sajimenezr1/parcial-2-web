import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-error/bussines-error.interceptor';

@Controller('medicos')
@UseInterceptors(BusinessErrorsInterceptor)
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Post()
  create(@Body() createMedicoDto: CreateMedicoDto) {
    return this.medicosService.create(createMedicoDto);
  }

  @Get()
  findAll() {
    return this.medicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicosService.findOne(id);
  }



  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicosService.delete(id);
  }
}
