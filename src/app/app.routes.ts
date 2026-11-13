import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', title: 'Inicio · OficioCR', loadComponent: () => import('./pages/inicio.component').then(m => m.InicioComponent) },
  { path: 'buscar', title: 'Buscar servicios · OficioCR', loadComponent: () => import('./pages/buscar.component').then(m => m.BuscarComponent) },
  { path: 'trabajador/:id', title: 'Perfil · OficioCR', loadComponent: () => import('./pages/trabajador.component').then(m => m.TrabajadorComponent) },
  { path: 'mensajes', title: 'Mensajes · OficioCR', loadComponent: () => import('./pages/mensajes.component').then(m => m.MensajesComponent) },
  { path: 'solicitud', title: 'Mi solicitud · OficioCR', loadComponent: () => import('./pages/solicitud.component').then(m => m.SolicitudComponent) },
  { path: 'pagos', title: 'Pagos · OficioCR', loadComponent: () => import('./pages/pagos.component').then(m => m.PagosComponent) },
  { path: 'asistente', title: 'Asistente IA · OficioCR', loadComponent: () => import('./pages/asistente.component').then(m => m.AsistenteComponent) },
  { path: '**', redirectTo: '' }
];
