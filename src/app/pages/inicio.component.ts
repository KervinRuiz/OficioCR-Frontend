import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatosService } from '../core/datos.service';

@Component({
  selector: 'app-inicio', standalone: true, imports: [FormsModule, RouterLink],
  template: `
    <section class="hero stack">
      <h1>Encuentra profesionales para tu hogar</h1>
      <p class="muted">Pintura, plomería, electricidad y mucho más, cerca de ti.</p>
      <div class="row">
        <input class="input" [(ngModel)]="q" (keyup.enter)="buscar()" placeholder="¿Qué servicio necesitas?" aria-label="Servicio">
        <button class="btn" (click)="buscar()">Buscar</button>
      </div>
    </section>
    <h2 style="margin-top:1.5rem">Categorías populares</h2>
    <div class="grid4">
      @for (c of cats; track c.n) {
        <a class="card cat" routerLink="/buscar" [queryParams]="{ categoria: c.n }"><span class="e">{{ c.e }}</span>{{ c.n }}</a>
      }
    </div>`
})
export class InicioComponent {
  private router = inject(Router);
  q = '';
  cats = [{ n: 'Plomería', e: '🔧' }, { n: 'Electricidad', e: '⚡' }, { n: 'Pintura', e: '🎨' }, { n: 'Limpieza', e: '🧹' }];
  buscar() { this.router.navigate(['/buscar'], { queryParams: { q: this.q || null } }); }
}
