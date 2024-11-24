import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { MedicosService } from './medicos.service';
import { MedicoEntity } from './entities/medico.entity';
import { CreateMedicoDto } from './dto/create-medico.dto';


describe('Medicos Service', () => {
    let service: MedicosService;
    let repository: Repository<MedicoEntity>;
    let medicosList: MedicoEntity[] = [];

    const seedDatabase = async () => {
      await repository.clear();
      medicosList = []
      for(let i = 0; i < 5; i++){
          const medico : MedicoEntity = await repository.save({
          nombre: faker.person.fullName(),
          especialidad: 'pediatra',
          telefono: faker.phone.number()
          })
          medicosList.push(medico);
      }
    }

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [...TypeOrmTestingConfig()],
        providers: [MedicosService],
      }).compile();

      service = module.get<MedicosService>(MedicosService);
      repository = module.get<Repository<MedicoEntity>>(getRepositoryToken(MedicoEntity));

      await seedDatabase();
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });   

    it('findAll should return all doctors', async () => {
      const doctors: MedicoEntity[] = await service.findAll();
      expect(doctors).not.toBeNull();
      expect(doctors).toHaveLength(medicosList.length);
    });

    it('findOne should return a doctor by id', async () => {
      const storedDoctor: MedicoEntity = medicosList[0];
      const doctor: MedicoEntity = await service.findOne(storedDoctor.id);
      expect(doctor).not.toBeNull();
      expect(doctor.nombre).toEqual(storedDoctor.nombre);
      expect(doctor.especialidad).toEqual(storedDoctor.especialidad);
      expect(doctor.telefono).toEqual(storedDoctor.telefono);
    });

    it('findOne should throw an exception for an invalid doctor', async () => {
      await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The doctor with id 0 doesn't exists")
    });

    it('create should return a new doctor', async () => {

      const doctor : CreateMedicoDto = {
        nombre : faker.person.fullName(),
        especialidad: 'pediatra',
        telefono: faker.phone.number()
      }
   
      const newDoctor: MedicoEntity = await service.create(doctor);
      expect(newDoctor).not.toBeNull();
   
      const storedDoctor: MedicoEntity = await repository.findOne({where: {id: newDoctor.id}})
      expect(storedDoctor).not.toBeNull();

      expect(newDoctor.nombre).toEqual(storedDoctor.nombre);
      expect(doctor.especialidad).toEqual(storedDoctor.especialidad);
      expect(doctor.telefono).toEqual(storedDoctor.telefono);
    });

    it('create must throw an exception if name is invalid', async () =>{
      const doctor : CreateMedicoDto = {
        nombre : "",
        especialidad: 'pediatra',
        telefono: faker.phone.number()
      }
      await expect(() => service.create(doctor)).rejects.toHaveProperty("message", "nombre or especialidad must have a valid value")
    })

    it('create must throw an exception if especialidad is invalid', async () =>{
      const doctor : CreateMedicoDto = {
        nombre : faker.person.fullName(),
        especialidad: '',
        telefono: faker.phone.number()
      }
      await expect(() => service.create(doctor)).rejects.toHaveProperty("message", "nombre or especialidad must have a valid value")
    })

    it('delete should remove a doctor', async () => {
      const doctor: MedicoEntity = medicosList[0];
      await service.delete(doctor.id);
      const deletedUser: MedicoEntity = await repository.findOne({ where: { id: doctor.id } })
      expect(deletedUser).toBeNull();
    });

    it('delete should throw an exception for an invalid doctor', async () => {
      await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The doctor with id 0 doesn't exists")
    });

   });


   


