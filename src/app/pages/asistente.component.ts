import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatosService, Trabajador } from '../core/datos.service';

@Component({
  selector: 'app-asistente', standalone: true, imports: [FormsModule, RouterLink],
  template: `
    <h1>Asistente de IA</h1><p class="muted">Cuéntame qué necesitas y te recomiendo profesionales. Respuestas simuladas.</p>
    <div class="row"><textarea class="input" rows="2" [(ngModel)]="texto" placeholder="Ej: tengo una fuga de agua en el baño" aria-label="Describe tu problema"></textarea>
      <button class="btn" [disabled]="!texto.trim()" (click)="pedir()">Recomendar</button></div>
    @if (hecho()) {
      <div class="card stack" style="margin-top:1rem">
        @if (res(); as r) {
          <strong>Te conviene un profesional de {{ r.categoria }}:</strong>
          @for (t of r.trabajadores; track t.id) { <a [routerLink]="['/trabajador', t.id]">{{ t.nombre }} · ★ {{ t.nota }}</a> }
        } @else { <span>No pude identificar el oficio. Prueba describiendo el problema con otras palabras o <a routerLink="/buscar">busca por categoría</a>.</span> }
      </div>
    }`
})
export class AsistenteComponent {
  private datos = inject(DatosService);
  texto = ''; hecho = signal(false); res = signal<{ categoria: string; trabajadores: Trabajador[] } | null>(null);
  pedir() { this.res.set(this.datos.recomendar(this.texto)); this.hecho.set(true); }
}
