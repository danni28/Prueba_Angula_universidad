import { Injectable } from '@angular/core';
import { TypeRequest } from '../models/enums/type-request.enum';
import { RequestStructure } from '../models/request/request-structure.model';
import { AppService } from './app.service';
import { map, Observable } from 'rxjs';
import { ResponseStructure } from '../models/request/response-structure.model';
import { IAlumno } from '../models/interface/alumno.interface';
import { IProfesor } from '../models/interface/profesor.interface';

@Injectable({
  providedIn: 'root',
})
//SERVICIO PARA CONSUMIR LOS SERVICIOS API JAVA
export class ApiJavaService {
  constructor(private _appService: AppService) {}

  listarAlumnos(): Observable<ResponseStructure> {
    const request: RequestStructure = {
      request: {
        type: TypeRequest.GET,
      },
      endpoint: '/Alumno/Listar',
    };
    return this._appService.sentRequest(request).pipe(
      map((response: any) => {
        return response as ResponseStructure;
      })
    );
  }
  listarProfesores(): Observable<ResponseStructure> {
    const request: RequestStructure = {
      request: {
        type: TypeRequest.GET,
      },
      endpoint: '/Profesor/Listar',
    };
    return this._appService.sentRequest(request).pipe(
      map((response: any) => {
        return response as ResponseStructure;
      })
    );
  }
  registrarAlumno(data: IAlumno) {
    const request: RequestStructure = {
      request: {
        type: TypeRequest.POST,
        body: data,
      },
      endpoint: '/Alumno/Registrar',
    };
    return this._appService.sentRequest(request).pipe(
      map((response: any) => {
        return response as ResponseStructure;
      })
    );
  }
  registrarProfesor(data: IProfesor) {
    const request: RequestStructure = {
      request: {
        type: TypeRequest.POST,
        body: data,
      },
      endpoint: '/Profesor/Registrar',
    };
    return this._appService.sentRequest(request).pipe(
      map((response: any) => {
        return response as ResponseStructure;
      })
    );
  }
  eliminarAlumno(id: number) {
    const request: RequestStructure = {
      request: {
        type: TypeRequest.DELETE,
      },
      endpoint: `/Alumno/Eliminar/${id}`,
    };
    return this._appService.sentRequest(request).pipe(
      map((response: any) => {
        return response as ResponseStructure;
      })
    );
  }
  eliminarProfesor(id: number) {
    const request: RequestStructure = {
      request: {
        type: TypeRequest.DELETE,
      },
      endpoint: `/Profesor/Eliminar/${id}`,
    };
    return this._appService.sentRequest(request).pipe(
      map((response: any) => {
        return response as ResponseStructure;
      })
    );
  }
}
