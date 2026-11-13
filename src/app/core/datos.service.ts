import { Injectable, signal } from '@angular/core';

export type Estado = 'Pendiente' | 'Aceptada' | 'Completada' | 'Rechazada' | 'Cancelada';
export interface Servicio { nombre: string; precio: number; }
export interface Trabajador { id: number; nombre: string; oficio: string; nota: number; resenas: number; km: number; ubicacion: string; servicios: Servicio[]; }
export interface Mensaje { de: 'yo' | 'otro'; texto: string; hora: string; }
export interface Solicitud { trabajador: Trabajador; servicio: Servicio; fecha: string; estado: Estado; valoracion: number; }
export interface Pago { id: number; concepto: string; monto: number; fecha: string; estado: 'Aprobado' | 'En pruebas'; }

const hora = () => new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' });

@Injectable({ providedIn: 'root' })
export class DatosService {
  readonly categorias = ['Plomería', 'Electricidad', 'Pintura', 'Limpieza'];
  readonly trabajadores: Trabajador[] = [
    { id: 1, nombre: 'Juan Méndez', oficio: 'Plomería', nota: 4.8, resenas: 56, km: 2.1, ubicacion: 'San José, CR',
      servicios: [{ nombre: 'Reparación de fugas', precio: 25000 }, { nombre: 'Instalación de grifería', precio: 35000 }, { nombre: 'Mantenimiento general', precio: 40000 }] },
    { id: 2, nombre: 'Ana Torres', oficio: 'Pintura', nota: 4.9, resenas: 34, km: 3.1, ubicacion: 'Heredia, CR',
      servicios: [{ nombre: 'Pintura de interiores', precio: 60000 }, { nombre: 'Pintura de fachada', precio: 95000 }] },
    { id: 3, nombre: 'Carlos Rojas', oficio: 'Electricidad', nota: 4.7, resenas: 28, km: 4.0, ubicacion: 'San José, CR',
      servicios: [{ nombre: 'Revisión de cableado', precio: 30000 }, { nombre: 'Instalación de tomacorrientes', precio: 22000 }] },
    { id: 4, nombre: 'María Solís', oficio: 'Limpieza', nota: 4.6, resenas: 41, km: 5.2, ubicacion: 'Cartago, CR',
      servicios: [{ nombre: 'Limpieza profunda', precio: 45000 }, { nombre: 'Limpieza post-obra', precio: 70000 }] }
  ];

  // Datos de ejemplo: se reemplazan por llamadas HTTP al backend (ASP.NET Core) cuando esté listo.
  readonly solicitud = signal<Solicitud | null>(null);
  readonly mensajes = signal<Mensaje[]>([
    { de: 'yo', texto: 'Hola, necesito reparar una fuga en el baño. ¿Podrías ayudarme esta semana?', hora: '10:24' },
    { de: 'otro', texto: '¡Claro! Puedo ir el jueves en la tarde. ¿Te parece?', hora: '10:27' }
  ]);
  readonly pagos = signal<Pago[]>([{ id: 1, concepto: 'Reparación de fuga · Juan Méndez', monto: 25000, fecha: '15 may 2025', estado: 'En pruebas' }]);

  trabajador(id: number) { return this.trabajadores.find(t => t.id === id); }

  solicitar(t: Trabajador, s: Servicio) {
    this.solicitud.set({ trabajador: t, servicio: s, fecha: new Date().toLocaleDateString('es-CR'), estado: 'Pendiente', valoracion: 0 });
  }
  enviar(texto: string) {
    this.mensajes.update(m => [...m, { de: 'yo', texto, hora: hora() }]);
    setTimeout(() => this.mensajes.update(m => [...m, { de: 'otro', texto: 'Perfecto, confirmemos la solicitud.', hora: hora() }]), 900);
  }
  pagar() {
    const s = this.solicitud();
    if (!s) return;
    this.pagos.update(p => [...p, { id: p.length + 1, concepto: `${s.servicio.nombre} · ${s.trabajador.nombre}`, monto: s.servicio.precio, fecha: s.fecha, estado: 'En pruebas' }]);
    this.solicitud.set({ ...s, estado: 'Completada' });
  }
  valorar(n: number) { const s = this.solicitud(); if (s) this.solicitud.set({ ...s, valoracion: n }); }
  // Recomendador simulado por palabras clave (sustituir por el servicio de IA real).
  recomendar(texto: string): { categoria: string; trabajadores: Trabajador[] } | null {
    const t = texto.toLowerCase();
    const mapa: Record<string, string[]> = {
      'Plomería': ['fuga', 'tubo', 'grifo', 'agua', 'baño', 'cañería'],
      'Electricidad': ['luz', 'cable', 'enchufe', 'corto', 'electric', 'tomacorriente'],
      'Pintura': ['pintar', 'pintura', 'pared', 'fachada'],
      'Limpieza': ['limpi', 'polvo', 'obra', 'mudanza']
    };
    const cat = Object.keys(mapa).find(c => mapa[c].some(k => t.includes(k)));
    return cat ? { categoria: cat, trabajadores: this.trabajadores.filter(x => x.oficio === cat) } : null;
  }
}
