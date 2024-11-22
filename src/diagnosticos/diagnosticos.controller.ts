import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DiagnosticosService } from './diagnosticos.service';
import { CreateDiagnosticoDto } from './dto/create-diagnostico.dto';

@Controller('diagnosticos')
export class DiagnosticosController {
  constructor(private readonly diagnosticosService: DiagnosticosService) {}

  @Post()
  create(@Body() createDiagnosticoDto: CreateDiagnosticoDto) {
    return this.diagnosticosService.create(createDiagnosticoDto);
  }

  @Get()
  findAll() {
    return this.diagnosticosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.diagnosticosService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.diagnosticosService.remove(id);
  }
}
