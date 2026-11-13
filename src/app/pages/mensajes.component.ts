import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatosService } from '../core/datos.service';

@Component({
  selector: 'app-mensajes', standalone: true, imports: [FormsModule],
  template: `
    <div class="row"><span class="avatar">J</span><div><strong>Juan Méndez</strong><div class="muted">En línea</div></div></div>
    <div class="chat card" style="margin:1rem 0;min-height:300px" role="log" aria-live="polite">
      @for (m of datos.mensajes(); track $index) { <div class="m" [class.yo]="m.de === 'yo'">{{ m.texto }}<small>{{ m.hora }}</small></div> }
    </div>
    <form class="row" (ngSubmit)="enviar()"><input class="input" name="t" [(ngModel)]="texto" placeholder="Escribe un mensaje…" aria-label="Mensaje"><button class="btn" [disabled]="!texto.trim()">Enviar</button></form>`
})
export class MensajesComponent {
  datos = inject(DatosService); texto = '';
  enviar() { this.datos.enviar(this.texto.trim()); this.texto = ''; }
}
