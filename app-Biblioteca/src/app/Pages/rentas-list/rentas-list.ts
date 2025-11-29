import { Component } from '@angular/core';
import { RentasForm } from '../rentas-form/rentas-form';

@Component({
  selector: 'app-rentas-list',
  imports: [RentasForm],
  standalone: true,
  templateUrl: './rentas-list.html',
  styleUrl: './rentas-list.scss',
})
export class RentasList {}
