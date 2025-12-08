import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../../services/libros/libros-service';
import { ClientesService } from '../../services/clientes/clientes-service';
import { RentasService } from '../../services/rentas/rentas-service';


@Component({
  selector: 'app-home',
  imports: [],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  totalLibros: number = 0;
  totalClientes: number = 0;
  totalRentas: number = 0;

  constructor(private booksService: LibrosService,
    private clientesService: ClientesService,
    private rentasService: RentasService) {}

  ngOnInit(): void {
    this.booksService.getAllLibros().subscribe((data) => {
      this.totalLibros = data.length;
    });

    this.clientesService.getAllClientes().subscribe((data) => {
      this.totalClientes = data.length;
    });

    this.rentasService.getAllRentas().subscribe((data) => {
      this.totalRentas = data.length;
    });
  }


}

