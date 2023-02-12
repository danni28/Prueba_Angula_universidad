import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import {
  CDependencia,
  CGenero,
  CMateria,
  CPrograma,
  CTipoPersona,
} from 'src/app/models/constants/const';
import { IPersona } from 'src/app/models/interface/persona.interface';
import { AppService } from 'src/app/services/app.service';
import { ApiJavaService } from 'src/app/services/ApiJava.service';
import { IAlumno } from 'src/app/models/interface/alumno.interface';
import { ResponseStructure } from 'src/app/models/request/response-structure.model';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  generos = CGenero;
  tipospersona = CTipoPersona;
  programas = CPrograma;
  materias = CMateria;
  dependencias = CDependencia;
  personas: IPersona[] = [];
  personasFiltradas: IPersona[] = [];
  searchPersona = '';
  cargando: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _apiJavaservice: ApiJavaService
  ) {
    this.initForm();
    this.cargando = true;
    //llamo al metodo listarAlumnos y listarProfesores
    forkJoin([
      this._apiJavaservice.listarAlumnos(),
      this._apiJavaservice.listarProfesores(),
    ]).subscribe(([resAlumnos, resProfesores]) => {
      if (resAlumnos.status && resProfesores.status) {
        // mapeo los datos de los alumnos y profesores
        const alumnos: IPersona[] = resAlumnos.data.map((item: any) => {
          return {
            id: item.id,
            nombreCompleto: item.nombreCompleto,
            identificacion: item.identificacion,
            email: item.email,
            numeroTelefono: item.numeroTelefono,
            direccionResidencia: item.direccionResidencia,
            genero: item.genero,
            tipopersona: 1,
          };
        });
        const profesores: IPersona[] = resProfesores.data.map((item: any) => {
          return {
            id: item.id,
            nombreCompleto: item.nombreCompleto,
            identificacion: item.identificacion,
            email: item.email,
            numeroTelefono: item.numeroTelefono,
            direccionResidencia: item.direccionResidencia,
            genero: item.genero,
            tipopersona: 2,
          };
        });
        //agrego los alumnos y profesores a la lista de personas
        this.personas = [...alumnos, ...profesores];
        this.personasFiltradas = [...alumnos, ...profesores];
        this.cargando = false;
      }
    }); //fin forkJoin
  }

  ngOnInit(): void {}
  //metodo para inicializar el formulario
  initForm() {
    this.form = this._fb.group({
      nombreCompleto: [null, Validators.required],
      identificacion: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      numeroTelefono: [null, [Validators.required]],
      direccionResidencia: [null, Validators.required],
      genero: ['M', Validators.required],
      tipopersona: [null, Validators.required],
    });
  }
  // METODO PARA CAPTURAR EL TIPO DE PERSONA SELECCIONADO
  capturaTipoPersona(idtipo: number) {
    //verifico si el tipo seleccionado es alumno
    if (idtipo == 1) {
      //agrego los nuevos controles de alumno al formulario
      this.form.addControl(
        'numeroMatricula',
        new FormControl(null, [Validators.required])
      );
      this.form.addControl(
        'programa',
        new FormControl(null, [Validators.required])
      );
      this.form.addControl(
        'notaPromedio',
        new FormControl(null, [Validators.required])
      );
      //verificio si existe los controles de profesor si existen los elimino
      if (
        this.form.get('salario') &&
        this.form.get('dependencia') &&
        this.form.get('materia')
      ) {
        //elimino los controles de profesor
        this.form.removeControl('salario');
        this.form.removeControl('dependencia');
        this.form.removeControl('materia');
      }

      //verifico si el tipo seleccionado es profesor
    } else if (idtipo == 2) {
      //agrego los controles de profesor al formulario
      this.form.addControl(
        'salario',
        new FormControl(null, [Validators.required])
      );
      this.form.addControl(
        'dependencia',
        new FormControl(null, [Validators.required])
      );
      this.form.addControl(
        'materia',
        new FormControl(null, [Validators.required])
      );
      //verificio si existe los controles de alumno si existen los elimino
      if (
        this.form.get('salario') &&
        this.form.get('dependencia') &&
        this.form.get('materia')
      ) {
        //elimino los controles de alumno
        this.form.removeControl('numeroMatricula');
        this.form.removeControl('programa');
        this.form.removeControl('notaPromedio');
      }
    }
  }
  //FUNCION PARA REGISTRAR UNA PERSONA
  agregarPersona() {
    // LLENO UN OBJETO DE TIPO PERSONA CON LOS DATOS DEL FORMULARIO
    const persona: IPersona = {
      nombreCompleto: this.form.value.nombreCompleto,
      identificacion: this.form.value.identificacion,
      email: this.form.value.email,
      numeroTelefono: this.form.value.numeroTelefono,
      direccionResidencia: this.form.value.direccionResidencia,
      genero: this.form.value.genero,
      tipopersona: this.form.value.tipopersona,
    };
    // VERIFICO SI EL TIPO DE PERSONA ES ALUMNO O PROFESOR
    if (this.form.value.tipopersona == 1) {
      this._apiJavaservice.registrarAlumno(this.form.value).subscribe(
        (res: ResponseStructure) => {
          this.form.reset();
          //elimino los controles de alumno
          this.form.removeControl('numeroMatricula');
          this.form.removeControl('programa');
          this.form.removeControl('notaPromedio');
          if (res.status) {
            //agrego el id de la persona que se registro
            persona.id = res.data;
            //agrego la persona al arreglo de personas
            this.personas.push(persona);
          } else {
            alert('Error al registrar el alumno');
          }
        },
        (error) => {
          alert('Error al registrar el alumno');
        }
      );
    } else if (this.form.value.tipopersona == 2) {
      this._apiJavaservice.registrarProfesor(this.form.value).subscribe(
        (res: ResponseStructure) => {
          this.form.reset();
          //elimino los controles de profesor
          this.form.removeControl('salario');
          this.form.removeControl('dependencia');
          this.form.removeControl('materia');
          if (res.status) {
            //agrego el id de la persona que se registro
            persona.id = res.data;
            //agrego la persona al arreglo de personas
            this.personas.push(persona);
          } else {
            alert('Error al registrar el alumno');
          }
        },
        (error) => {
          alert('Error al registrar el alumno');
        }
      );
    }
  }
  //funcion para eliminar una persona
  eliminarPersona(id: number, tipopersona: 1 | 2) {
    if (tipopersona == 1) {
      this._apiJavaservice.eliminarAlumno(id).subscribe(
        (res: ResponseStructure) => {
          if (res.status) {
            this.personas = this.personas.filter((item) => item.id != id);
          }
        },
        (error) => {
          alert('Error al eliminar el alumno');
        }
      );
    } else if (tipopersona == 2) {
      this._apiJavaservice.eliminarProfesor(id).subscribe(
        (res: ResponseStructure) => {
          if (res.status) {
            this.personas = this.personas.filter((item) => item.id != id);
          }
        },
        (error) => {
          alert('Error al eliminar el profesor');
        }
      );
    }
  }
  //funcion para buscar una persona
  buscarPersona() {
    this.personas = this.personasFiltradas.filter((persona) =>
      persona.nombreCompleto
        .toLowerCase()
        .includes(this.searchPersona.toLowerCase())
    );
  }
}
