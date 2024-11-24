import { Test, TestingModule } from '@nestjs/testing';
import { PacientesService } from './pacientes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { PacienteEntity } from './entities/paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';

describe('Pacientes Service', () => {
    let service: PacientesService;
    let repository: Repository<PacienteEntity>;
    let pacientesList: PacienteEntity[] = [];

    const seedDatabase = async () => {
      await repository.clear();
      pacientesList = [];
      for(let i = 0; i < 5; i++){
          const paciente : PacienteEntity = await repository.save({
          nombre: faker.person.fullName(),
          genero: faker.person.gender(),
          })
          pacientesList.push(paciente);
      }
    }

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [...TypeOrmTestingConfig()],
        providers: [PacientesService],
      }).compile();

      service = module.get<PacientesService>(PacientesService);
      repository = module.get<Repository<PacienteEntity>>(getRepositoryToken(PacienteEntity));
      await seedDatabase();
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });   

    it('findAll should return all patients', async () => {
      const patients: PacienteEntity[] = await service.findAll();
      expect(patients).not.toBeNull();
      expect(patients).toHaveLength(pacientesList.length);
    });

    it('findOne should return a patient by id', async () => {
      const storedPatient: PacienteEntity = pacientesList[0];
      const patient: PacienteEntity = await service.findOne(storedPatient.id);
      expect(patient).not.toBeNull();
      expect(patient.nombre).toEqual(storedPatient.nombre);
      expect(patient.genero).toEqual(storedPatient.genero);
    });

    it('findOne should throw an exception for an invalid patient', async () => {
      await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The pacient with id 0 doesn't exists")
    });

    it('create should return a new patient', async () => {

      const patient : CreatePacienteDto = {
        nombre : faker.person.fullName(),
        genero: faker.person.gender()
      }
   
      const newPatient: PacienteEntity = await service.create(patient);
      expect(newPatient).not.toBeNull();
   
      const storedPatient: PacienteEntity = await repository.findOne({where: {id: newPatient.id}})
      expect(storedPatient).not.toBeNull();

      expect(newPatient.nombre).toEqual(storedPatient.nombre);
      expect(newPatient.genero).toEqual(storedPatient.genero);
    });

    it ('create should return an exception for an invalid name ', async() =>{
        const patient : CreatePacienteDto = {
          nombre : 'Ra',
          genero: faker.person.gender()
        }
        await expect(() => service.create(patient)).rejects.toHaveProperty("message", "nombre must be longer than or equal to 3 characters")
    })

    it('delete should remove a patient', async () => {
      const patient: PacienteEntity = pacientesList[0];
      await service.remove(patient.id);
      const deletedUser: PacienteEntity = await repository.findOne({ where: { id: patient.id } })
      expect(deletedUser).toBeNull();
    });

    it('delete should throw an exception for an invalid patient', async () => {
      await expect(() => service.remove("0")).rejects.toHaveProperty("message", "The pacient with id 0 doesn't exists")
    });

   });


   

