export interface IPersona {
  id?: number;
  nombreCompleto: string;
  email: string;
  identificacion: string;
  numeroTelefono: string;
  genero: string;
  direccionResidencia: string;
  tipopersona?: 1 | 2;
}
