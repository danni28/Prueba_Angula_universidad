import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallePersonaComponent } from './detalle-persona.component';

const routes: Routes = [{ path: '', component: DetallePersonaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetallePersonaRoutingModule { }
