import { Component, OnInit, signal, viewChild } from '@angular/core';
import { RentasForm } from '../rentas-form/rentas-form';
import { RentasService } from '../../services/rentas/rentas-service';
import { Rentas } from '../../models/rentas';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rentas-list',
  imports: [RentasForm, HttpClientModule, CommonModule],
  standalone: true,
  templateUrl: './rentas-list.html',
  styleUrl: './rentas-list.scss',
})
export class RentasList implements OnInit {
  formComponent = viewChild(RentasForm);
  rentas = signal<Rentas[]>([]);
  cargando = signal<boolean>(true);

  constructor(private rentasService: RentasService) {}

  ngOnInit() {
    this.loadRentas();
  }

  loadRentas() {
    this.cargando.set(true);
    this.rentasService.getAllRentas().subscribe({
      next: (data) => {
        this.rentas.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar rentas', err);
        this.cargando.set(false);
      },
    });
  }

  editarRenta(renta: Rentas) {
    this.formComponent()?.cargarRenta(renta);
  }

  eliminarRenta(renta: Rentas) {
    if (confirm('¿Seguro que quieres eliminar esta renta?')) {
      const id = Number(renta.idRenta);
      this.rentasService.deleteRenta(id).subscribe({
        next: () => {
          alert('Renta eliminada correctamente');
          this.loadRentas();
        },
        error: () => alert('Error al eliminar renta'),
      });
    }
  }

  recargarTabla() {
    this.loadRentas();
  }
}
