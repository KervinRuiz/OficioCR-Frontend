import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root', standalone: true, imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="top">
      <a routerLink="/" class="logo" aria-label="OficioCR, inicio">Oficio<span>CR</span></a>
      <nav aria-label="Principal">
        @for (l of links; track l.ruta) {
          <a [routerLink]="l.ruta" routerLinkActive="on" [routerLinkActiveOptions]="{ exact: l.ruta === '/' }">{{ l.texto }}</a>
        }
      </nav>
      <button class="icon" (click)="alternar()" [attr.aria-label]="oscuro() ? 'Usar modo claro' : 'Usar modo oscuro'">{{ oscuro() ? '☀' : '☾' }}</button>
    </header>
    <main><router-outlet /></main>`
})
export class AppComponent {
  links = [
    { ruta: '/', texto: 'Inicio' }, { ruta: '/buscar', texto: 'Buscar' }, { ruta: '/solicitud', texto: 'Mis solicitudes' },
    { ruta: '/mensajes', texto: 'Mensajes' }, { ruta: '/pagos', texto: 'Pagos' }, { ruta: '/asistente', texto: 'Asistente IA' }
  ];
  oscuro = signal(localStorage.getItem('tema') === 'oscuro');
  constructor() { this.aplicar(); }
  alternar() { this.oscuro.update(v => !v); localStorage.setItem('tema', this.oscuro() ? 'oscuro' : 'claro'); this.aplicar(); }
  private aplicar() { document.documentElement.dataset['theme'] = this.oscuro() ? 'dark' : 'light'; }
}
