import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//REDIRECCION DE RUTAS AQUI LA PRINCIPAL SERIA EL FORMULARIO
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/views/formulario/formulario.module').then(
        (m) => m.FormularioModule
      ),
  },
  {
    path: 'detallepersona',
    loadChildren: () =>
      import('./modules/views/detalle-persona/detalle-persona.module').then(
        (m) => m.DetallePersonaModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
