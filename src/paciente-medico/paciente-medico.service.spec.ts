import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { de_CH, faker } from '@faker-js/faker';
import { MedicosService } from '../medicos/medicos.service';
import { MedicoEntity } from '../medicos/entities/medico.entity';
import { PacienteEntity } from '../pacientes/entities/paciente.entity';
import { PacientesService } from '../pacientes/pacientes.service';
import { PacienteMedicoService } from './paciente-medico.service';

describe('Pacientes Service', () => {
    let pacienteMedicoService : PacienteMedicoService;
    let pacientesService: PacientesService;
    let medicosService: MedicosService;
    let pacientesRepository: Repository<PacienteEntity>;
    let medicosRepository: Repository<MedicoEntity>;
    let pacientesList: PacienteEntity[] = [];
    let medicosList: MedicoEntity[] = [];

    const seedDatabase = async () => {
      await pacientesRepository.clear();
      await medicosRepository.clear()
      pacientesList = [];
      medicosList = [];

      for(let i = 0; i < 5; i++){

        const paciente : PacienteEntity = await pacientesRepository.save({
        nombre: faker.person.fullName(),
        genero: faker.person.gender(),
        })
        pacientesList.push(paciente);

        const medico : MedicoEntity = await medicosRepository.save({
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
        providers: [PacientesService, MedicosService, PacienteMedicoService],
      }).compile();

      pacientesService = module.get<PacientesService>(PacientesService);
      pacientesRepository = module.get<Repository<PacienteEntity>>(getRepositoryToken(PacienteEntity));
      medicosService = module.get<MedicosService>(MedicosService);
      medicosRepository = module.get<Repository<MedicoEntity>>(getRepositoryToken(MedicoEntity));
      pacienteMedicoService = module.get<PacienteMedicoService>(PacienteMedicoService);

      await seedDatabase();
    });

    it('should be defined service pacient', () => {
        expect(pacientesService).toBeDefined();
    });   

    it('should be defined service doctors', () => {
    expect(medicosService).toBeDefined();
    });   
    
    it('addMedicoToPaciente should return patient entity', async () =>{
        const patient : PacienteEntity = pacientesList[0];
        const doctor : MedicoEntity = medicosList[0];
        const patientResponse = await pacienteMedicoService.addMedicoToPaciente(patient.id, doctor.id);

        expect(patientResponse).not.toBeNull();

        expect(patient.id).toEqual(patientResponse.id);
        expect(patient.nombre).toEqual(patientResponse.nombre)
        
    });

    it('addMedicoToPaciente with invalid id of patient should throw exception', async () =>{
        const doctor : MedicoEntity = medicosList[0];
        await expect(() => pacienteMedicoService.addMedicoToPaciente("0", doctor.id)).rejects.toHaveProperty("message", "The pacient with id 0 doesn't exists")
    });

    it('addMedicoToPaciente with invalid id of doctor should throw exception', async () =>{
        const patient : PacienteEntity = pacientesList[0];
        await expect(() => pacienteMedicoService.addMedicoToPaciente(patient.id, "0")).rejects.toHaveProperty("message", "The doctor with id 0 doesn't exists")
    });

    it('addMedicoToPaciente should return exception if patient has already 5 doctors', async () =>{

        const patient : PacienteEntity = pacientesList[0];

        for(let i = 0; i < 5; i++){
            const doctor : MedicoEntity = medicosList[i];
            await pacienteMedicoService.addMedicoToPaciente(patient.id, doctor.id);
        }

        const medico : MedicoEntity = await medicosRepository.save({
            nombre: faker.person.fullName(),
            especialidad: 'pediatra',
            telefono: faker.phone.number()
        })
        
        await expect(() => pacienteMedicoService.addMedicoToPaciente(patient.id, medico.id)).rejects.toHaveProperty("message", `The patient with id ${patient.id} has already 5 medics`)

    })
});
