import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { DiagnosticosService } from './diagnosticos.service';
import { DiagnosticoEntity } from './entities/diagnostico.entity';
import { CreateDiagnosticoDto } from './dto/create-diagnostico.dto';



describe('Diagnosticos Service', () => {
    let service: DiagnosticosService;
    let repository: Repository<DiagnosticoEntity>;
    let diagnosticsList: DiagnosticoEntity[] = [];

    const seedDatabase = async () => {
      await repository.clear();
      for(let i = 0; i < 5; i++){
          const diagnostico : DiagnosticoEntity = await repository.save({
          nombre: faker.company.name(),
          descripcion : faker.lorem.paragraph()
          })
          diagnosticsList.push(diagnostico);
      }
    }

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [...TypeOrmTestingConfig()],
        providers: [DiagnosticosService],
      }).compile();

      service = module.get<DiagnosticosService>(DiagnosticosService);
      repository = module.get<Repository<DiagnosticoEntity>>(getRepositoryToken(DiagnosticoEntity));
      diagnosticsList = [];
      await seedDatabase();
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });   
 
    it('findAll should return all diagnostics', async () => {
      const diagnostics: DiagnosticoEntity[] = await service.findAll();
      expect(diagnostics).not.toBeNull();
      expect(diagnostics).toHaveLength(diagnosticsList.length);
    });

    it('findOne should return a diagnostic by id', async () => {
      const storedDiagnostics: DiagnosticoEntity = diagnosticsList[0];
      const diagnostic: DiagnosticoEntity = await service.findOne(storedDiagnostics.id);
      expect(diagnostic).not.toBeNull();
      expect(diagnostic.nombre).toEqual(storedDiagnostics.nombre);
      expect(diagnostic.descripcion).toEqual(storedDiagnostics.descripcion);
    });

    it('findOne should throw an exception for an invalid diagnostic', async () => {
      await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The diagnostic with id 0 doesn't exists")
    });

    it('create should return a new diagnostic', async () => {

      const diagnostic : CreateDiagnosticoDto = {
        nombre : faker.person.fullName(),
        descripcion : faker.lorem.paragraph()
      }
   
      const newDiagnostic: DiagnosticoEntity = await service.create(diagnostic);
      expect(newDiagnostic).not.toBeNull();
   
      const storedDiagnostics: DiagnosticoEntity = await repository.findOne({where: {id: newDiagnostic.id}})
      expect(storedDiagnostics).not.toBeNull();

      expect(newDiagnostic.nombre).toEqual(storedDiagnostics.nombre);
      expect(diagnostic.descripcion).toEqual(storedDiagnostics.descripcion);
    });

    it('create must throw an exception if description is larger than 200 characters', async () =>{
      const diagnostic : CreateDiagnosticoDto = {
        nombre : faker.person.fullName(),
        descripcion: faker.lorem.sentence(200)
      }
      await expect(() => service.create(diagnostic)).rejects.toHaveProperty("message", "descripcion must be less than 200 characters")
    })

    it('remove should remove a diagnostic', async () => {
      const diagnostic: DiagnosticoEntity = diagnosticsList[0];
      await service.remove(diagnostic.id);
      const deletedUser: DiagnosticoEntity = await repository.findOne({ where: { id: diagnostic.id } })
      expect(deletedUser).toBeNull();
    });

    it('remove should throw an exception for an invalid diagnostic', async () => {
      await expect(() => service.remove("0")).rejects.toHaveProperty("message", "The diagnostic with id 0 doesn't exists")
    });

   });


   



