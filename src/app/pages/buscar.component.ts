import { Component, computed, inject, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatosService } from '../core/datos.service';

@Component({
  selector: 'app-buscar', standalone: true, imports: [FormsModule, RouterLink],
  template: `
    <h1>Buscar servicios</h1>
    <div class="row" style="margin-bottom:1rem">
      <input class="input grow" [ngModel]="q()" (ngModelChange)="q.set($event)" placeholder="¿Qué servicio necesitas?" aria-label="Buscar">
      <select class="input" style="width:auto" [ngModel]="cat()" (ngModelChange)="cat.set($event)" aria-label="Categoría">
        <option value="">Categoría</option>
        @for (c of datos.categorias; track c) { <option [value]="c">{{ c }}</option> }
      </select>
    </div>
    <div class="stack">
      @for (t of lista(); track t.id) {
        <div class="card row">
          <span class="avatar">{{ t.nombre[0] }}</span>
          <div class="grow"><strong>{{ t.nombre }}</strong><div class="muted">★ {{ t.nota }} ({{ t.resenas }}) · {{ t.oficio }} · a {{ t.km }} km</div></div>
          <a class="btn line" [routerLink]="['/trabajador', t.id]">Ver perfil</a>
        </div>
      } @empty {
        <p class="card muted">No encontramos profesionales con ese filtro. Prueba con otra categoría.</p>
      }
    </div>`
})
export class BuscarComponent {
  datos = inject(DatosService);
  q = signal(''); cat = signal('');
  @Input() set categoria(v: string | undefined) { this.cat.set(v ?? ''); }
  @Input('q') set busqueda(v: string | undefined) { this.q.set(v ?? ''); }
  lista = computed(() => {
    const q = this.q().toLowerCase().trim();
    return this.datos.trabajadores.filter(t => (!this.cat() || t.oficio === this.cat()) &&
      (!q || (t.nombre + t.oficio + t.servicios.map(s => s.nombre).join()).toLowerCase().includes(q)));
  });
}
