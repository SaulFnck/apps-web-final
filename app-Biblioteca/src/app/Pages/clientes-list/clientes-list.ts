import { Component, OnInit, signal, viewChild } from '@angular/core';
import { ClientesForm } from '../clientes-form/clientes-form';
import { ClientesService } from '../../services/clientes/clientes-service';
import { Clientes } from '../../models/clientes';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes-list',
  imports: [ClientesForm, HttpClientModule, CommonModule],
  standalone: true,
  templateUrl: './clientes-list.html',
  styleUrl: './clientes-list.scss',
})
export class ClientesList implements OnInit {
  formComponent = viewChild(ClientesForm);
  clientes = signal<Clientes[]>([]);
  cargando = signal<boolean>(true);

  constructor(private clientesService: ClientesService) {}

  ngOnInit() {
    this.loadClientes();
  }

  loadClientes() {
    this.cargando.set(true);
    this.clientesService.getAllClientes().subscribe({
      next: (data) => {
        this.clientes.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar clientes', err);
        this.cargando.set(false);
      },
    });
  }

  editarCliente(cliente: Clientes) {
    this.formComponent()?.cargarCliente(cliente);
  }

  eliminarCliente(cliente: Clientes) {
    if (confirm('¿Seguro que quieres eliminar este cliente?')) {
      // Cast ID to number if defined
      const id = Number(cliente.idCliente);
      this.clientesService.deleteCliente(id).subscribe({
        next: () => {
          alert('Cliente eliminado correctamente');
          this.loadClientes();
        },
        error: () => alert('Error al eliminar cliente'),
      });
    }
  }

  recargarTabla() {
    this.loadClientes();
  }
}
