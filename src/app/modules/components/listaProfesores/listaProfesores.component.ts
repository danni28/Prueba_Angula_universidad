import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProfesor } from 'src/app/models/interface/profesor.interface';
import { ResponseStructure } from 'src/app/models/request/response-structure.model';
import { ApiJavaService } from 'src/app/services/ApiJava.service';

@Component({
  selector: 'app-listaProfesores',
  templateUrl: './listaProfesores.component.html',
  styleUrls: ['./listaProfesores.component.css'],
})
export class ListaProfesoresComponent implements OnInit {
  profesores: IProfesor[] = [];
  profesoresFiltrados: IProfesor[] = [];
  searchProfesor = '';
  cargando: boolean = false;
  constructor(
    private _router: Router,
    private _apiJavaService: ApiJavaService
  ) {
    this.listarProfesores();
  }

  ngOnInit() {}

  listarProfesores() {
    this.cargando = true;
    this._apiJavaService.listarProfesores().subscribe(
      (res: ResponseStructure) => {
        this.cargando = false;
        if (res.status) {
          this.profesores = res.data;
          this.profesoresFiltrados = res.data;
        } else {
          console.log(res.message);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  buscarProfesor() {
    this.profesores = this.profesoresFiltrados.filter((persona) =>
      persona.nombreCompleto
        .toLowerCase()
        .includes(this.searchProfesor.toLowerCase())
    );
  }
  eliminarProfesor(id: number) {
    this._apiJavaService.eliminarProfesor(id).subscribe(
      (res: ResponseStructure) => {
        if (res.status) {
          this.profesores = this.profesores.filter((item) => item.id != id);
        }
      },
      (error) => {
        alert('Error al eliminar el profesor');
      }
    );
  }
}
