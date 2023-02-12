import { Component, OnInit, Input } from '@angular/core';
import { IAlumno } from 'src/app/models/interface/alumno.interface';
import { ResponseStructure } from 'src/app/models/request/response-structure.model';
import { ApiJavaService } from 'src/app/services/ApiJava.service';

@Component({
  selector: 'app-listaAlumnos',
  templateUrl: './listaAlumnos.component.html',
  styleUrls: ['./listaAlumnos.component.css'],
})
export class ListaAlumnosComponent implements OnInit {
  alumnos: IAlumno[] = [];
  alumnosFiltrados: IAlumno[] = [];
  searchAlumno = '';
  cargando: boolean = false;

  constructor(private _apiJavaService: ApiJavaService) {
    this.listarAlumnos();
  }

  ngOnInit() {}
  listarAlumnos() {
    this.cargando = true;
    this._apiJavaService.listarAlumnos().subscribe(
      (res: ResponseStructure) => {
        this.cargando = false;
        if (res.status) {
          this.alumnos = res.data;
          this.alumnosFiltrados = res.data;
          console.log(this.alumnos);
        } else {
          console.log(res.message);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  buscarAlumno() {
    this.alumnos = this.alumnosFiltrados.filter((persona) =>
      persona.nombreCompleto
        .toLowerCase()
        .includes(this.searchAlumno.toLowerCase())
    );
  }
  eliminarAlumno(id: number) {
    this._apiJavaService.eliminarAlumno(id).subscribe(
      (res: ResponseStructure) => {
        if (res.status) {
          this.alumnos = this.alumnos.filter((item) => item.id != id);
        }
      },
      (error) => {
        alert('Error al eliminar el alumno');
      }
    );
  }
}
