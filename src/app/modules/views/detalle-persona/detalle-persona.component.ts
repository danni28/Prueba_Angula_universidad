import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-persona',
  templateUrl: './detalle-persona.component.html',
  styleUrls: ['./detalle-persona.component.css'],
})
export class DetallePersonaComponent implements OnInit {
  tipopersona: string = '1' || '2';
  profesores: any[] = [];
  alumnos: any[] = [];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    //REVISAMOS LOS PARAMETROS DE LA URL PARA LLENAR LA VARIBABLE tipopersona SI NO ENCUENTRA EL PARAMETRO set EN LA URL LO REDIRIGE A LA PAGINA PRINCIPAL
    this._activatedRoute.queryParams.subscribe((params: any) => {
      if (params.set) {
        this.tipopersona = params.set;
      } else {
        this._router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {}
}
