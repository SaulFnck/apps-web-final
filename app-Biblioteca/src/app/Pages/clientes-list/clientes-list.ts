import { Component } from '@angular/core';
import { ClientesForm } from '../clientes-form/clientes-form';

@Component({
  selector: 'app-clientes-list',
  imports: [ClientesForm],
  standalone: true,
  templateUrl: './clientes-list.html',
  styleUrl: './clientes-list.scss',
})
export class ClientesList {}
