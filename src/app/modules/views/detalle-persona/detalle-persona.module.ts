import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetallePersonaRoutingModule } from './detalle-persona-routing.module';
import { DetallePersonaComponent } from './detalle-persona.component';
import { ListaAlumnosComponent } from '../../components/listaAlumnos/listaAlumnos.component';
import { ListaProfesoresComponent } from '../../components/listaProfesores/listaProfesores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DetallePersonaComponent,
    ListaAlumnosComponent,
    ListaProfesoresComponent,
  ],
  imports: [
    CommonModule,
    DetallePersonaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DetallePersonaModule {}
