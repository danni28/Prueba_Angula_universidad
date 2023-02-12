import { IPersona } from './persona.interface';

export interface IProfesor extends IPersona {
  salario: number;
  dependencia: string;
  materia: string;
}
