import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { DatosService } from '../core/datos.service';

@Component({
  selector: 'app-solicitud', standalone: true, imports: [RouterLink, DecimalPipe],
  template: `
    <h1>Mi solicitud</h1>
    @if (datos.solicitud(); as s) {
      <div class="card stack">
        <div class="row"><div class="grow"><h2>{{ s.servicio.nombre }}</h2>
          <div class="muted">Trabajador: {{ s.trabajador.nombre }} · Fecha: {{ s.fecha }}</div></div>
          <span class="badge" [class]="s.estado.toLowerCase()">{{ s.estado }}</span></div>
        <div>₡{{ s.servicio.precio | number }}</div>
        <div class="row">
          <a class="btn line" routerLink="/mensajes">Mensajes</a>
          @if (s.estado !== 'Completada') { <button class="btn" (click)="datos.pagar()">Pagar (simulado)</button> }
          @else { <a class="btn line" routerLink="/pagos">Ver comprobante de pago</a> }
        </div>
        @if (s.estado === 'Completada') {
          <div><strong>Dejar valoración</strong><div>
            @for (n of [1,2,3,4,5]; track n) { <button class="star" [class.on]="n <= s.valoracion" (click)="datos.valorar(n)" [attr.aria-label]="n + ' estrellas'">★</button> }
          </div></div>
        }
      </div>
    } @else { <p class="card muted">Aún no tienes solicitudes. <a routerLink="/buscar">Busca un profesional</a> para crear una.</p> }`
})
export class SolicitudComponent { datos = inject(DatosService); }
