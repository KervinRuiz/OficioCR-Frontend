import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DatosService } from '../core/datos.service';

@Component({
  selector: 'app-pagos', standalone: true, imports: [DecimalPipe],
  template: `
    <h1>Pagos</h1><p class="muted">Pago seguro en pruebas: no se realizan cobros reales.</p>
    <div class="card"><table>
      <tr><th>Concepto</th><th>Fecha</th><th>Estado</th><th>Monto</th></tr>
      @for (p of datos.pagos(); track p.id) {
        <tr><td>{{ p.concepto }}</td><td>{{ p.fecha }}</td><td><span class="badge" [class]="p.estado === 'Aprobado' ? 'aprobado' : 'en-pruebas'">{{ p.estado }}</span></td><td>₡{{ p.monto | number }}</td></tr>
      }
    </table></div>`
})
export class PagosComponent { datos = inject(DatosService); }
