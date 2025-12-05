import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../services/clientes/clientes-service';

@Component({
  selector: 'app-clientes-form',
  imports: [FormsModule, HttpClientModule, CommonModule],
  standalone: true,
  templateUrl: './clientes-form.html',
  styleUrl: './clientes-form.scss',
})
export class ClientesForm {
  @Output() onSave = new EventEmitter<void>();

  clienteEnEdicion: boolean = false;
  idClienteEditar: number | null = null;

  model = {
    idCliente: null,
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
  };

  constructor(private clientesService: ClientesService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    if (this.clienteEnEdicion && this.idClienteEditar !== null) {
      this.clientesService.updateCliente(this.idClienteEditar, this.model).subscribe({
        next: () => {
          alert('Cliente actualizado correctamente');
          this.resetForm(form);
          this.onSave.emit();
        },
        error: () => alert('Error al actualizar cliente'),
      });
    } else {
      this.clientesService.saveCliente(this.model).subscribe({
        next: () => {
          alert('Cliente insertado correctamente');
          this.resetForm(form);
          this.onSave.emit();
        },
        error: () => alert('Error al insertar cliente'),
      });
    }
  }

  resetForm(form: NgForm) {
    this.clienteEnEdicion = false;
    this.idClienteEditar = null;
    this.model = {
      idCliente: null,
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      direccion: '',
      fechaNacimiento: '',
    };
    form.resetForm();
  }

  cargarCliente(cliente: any) {
    this.clienteEnEdicion = true;
    this.idClienteEditar = cliente.idCliente;
    this.model = { ...cliente };
    if (this.model.fechaNacimiento) {
        this.model.fechaNacimiento = this.model.fechaNacimiento.toString().split('T')[0];
    }
  }
}
