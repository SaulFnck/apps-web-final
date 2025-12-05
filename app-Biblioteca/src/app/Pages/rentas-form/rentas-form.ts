import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RentasService } from '../../services/rentas/rentas-service';
import { ClientesService } from '../../services/clientes/clientes-service';
import { LibrosService } from '../../services/libros/libros-service';

@Component({
  selector: 'app-rentas-form',
  imports: [FormsModule, HttpClientModule, CommonModule],
  standalone: true,
  templateUrl: './rentas-form.html',
  styleUrl: './rentas-form.scss',
})
export class RentasForm implements OnInit {
  @Output() onSave = new EventEmitter<void>();

  clientes: any[] = [];
  libros: any[] = [];

  rentaEnEdicion: boolean = false;
  idRentaEditar: number | null = null;

  model = {
    idRenta: null,
    idCliente: 0,
    idLibro: 0,
    fechaRenta: '',
    fechaEstimadaDevolucion: '',
    fechaRealDevolucion: null as string | null,
    estado: true,
  };

  constructor(
    private rentasService: RentasService,
    private clientesService: ClientesService,
    private librosService: LibrosService
  ) {}

  ngOnInit() {
    this.cargarClientes();
    this.cargarLibros();
  }

  cargarClientes() {
    this.clientesService.getAllClientes().subscribe({
      next: (res) => (this.clientes = res),
      error: () => alert('Error al cargar clientes'),
    });
  }

  cargarLibros() {
    this.librosService.getAllLibros().subscribe({
      next: (res) => (this.libros = res),
      error: () => alert('Error al cargar libros'),
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    if (this.rentaEnEdicion && this.idRentaEditar !== null) {
      this.rentasService.updateRenta(this.idRentaEditar, this.model).subscribe({
        next: () => {
          alert('Renta actualizada correctamente');
          this.resetForm(form);
          this.onSave.emit();
        },
        error: () => alert('Error al actualizar renta'),
      });
    } else {
      this.rentasService.saveRenta(this.model).subscribe({
        next: () => {
          alert('Renta insertada correctamente');
          this.resetForm(form);
          this.onSave.emit();
        },
        error: () => alert('Error al insertar renta'),
      });
    }
  }

  resetForm(form: NgForm) {
    this.rentaEnEdicion = false;
    this.idRentaEditar = null;
    this.model = {
      idRenta: null,
      idCliente: 0,
      idLibro: 0,
      fechaRenta: '',
      fechaEstimadaDevolucion: '',
      fechaRealDevolucion: null,
      estado: true,
    };
    form.resetForm();
  }

  cargarRenta(renta: any) {
    this.rentaEnEdicion = true;
    this.idRentaEditar = renta.idRenta;
    this.model = { ...renta };
    
    // Format dates
    if (this.model.fechaRenta) this.model.fechaRenta = this.formatDate(this.model.fechaRenta);
    if (this.model.fechaEstimadaDevolucion) this.model.fechaEstimadaDevolucion = this.formatDate(this.model.fechaEstimadaDevolucion);
    if (this.model.fechaRealDevolucion) this.model.fechaRealDevolucion = this.formatDate(this.model.fechaRealDevolucion);
  }

  private formatDate(date: any): string {
    if (!date) return '';
    return date.toString().split('T')[0];
  }
}
