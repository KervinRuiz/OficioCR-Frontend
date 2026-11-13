import { Component, computed, inject, Input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { DatosService, Servicio } from '../core/datos.service';

@Component({
  selector: 'app-trabajador', standalone: true, imports: [DecimalPipe, RouterLink],
  template: `
    @if (t(); as w) {
      <a routerLink="/buscar">← Volver</a>
      <div class="row card" style="margin:1rem 0">
        <span class="avatar big">{{ w.nombre[0] }}</span>
        <div><h1>{{ w.nombre }}</h1><div>★ {{ w.nota }} ({{ w.resenas }} valoraciones)</div>
          <span class="badge aceptada">{{ w.oficio }}</span> <span class="muted">📍 {{ w.ubicacion }}</span></div>
      </div>
      <div class="card">
        <h2>Servicios</h2>
        <table>
          @for (s of w.servicios; track s.nombre) {
            <tr><td><label><input type="radio" name="s" [checked]="sel() === s" (change)="sel.set(s)"> {{ s.nombre }}</label></td><td>₡{{ s.precio | number }}</td></tr>
          }
        </table>
        <button class="btn" style="width:100%;margin-top:1rem" [disabled]="!sel()" (click)="solicitar(w)">Solicitar servicio</button>
      </div>
    } @else { <p>Profesional no encontrado.</p> }`
})
export class TrabajadorComponent {
  private datos = inject(DatosService); private router = inject(Router);
  private id = signal(0);
  @Input() set idParam(_: string) {}
  @Input('id') set setId(v: string) { this.id.set(+v); this.sel.set(null); }
  sel = signal<Servicio | null>(null);
  t = computed(() => this.datos.trabajador(this.id()));
  solicitar(w: NonNullable<ReturnType<typeof this.t>>) { this.datos.solicitar(w, this.sel()!); this.router.navigate(['/solicitud']); }
}
