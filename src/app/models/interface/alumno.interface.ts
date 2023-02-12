import { IPersona } from 'src/app/models/interface/persona.interface';

export interface IAlumno extends IPersona {
  numeroMatricula: string;
  programa: string;
  notaPromedio: number;
}
