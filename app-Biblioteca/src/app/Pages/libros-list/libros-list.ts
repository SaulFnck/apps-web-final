import { Component, OnInit, signal } from '@angular/core';

import { Libros } from '../../models/libros';
import { LibrosService } from '../../services/libros/libros-service';

import { LibrosForm } from '../libros-form/libros-form';

@Component({
  selector: 'app-libros-list',
  imports: [LibrosForm],
  standalone: true,
  templateUrl: './libros-list.html',
  styleUrl: './libros-list.scss',
})
export class LibrosList implements OnInit {
  //Variables de estado
  libros = signal<Libros[]>([]);
  cargando = signal<boolean>(true);

  constructor(private librosService: LibrosService) {}
  private loadLibros() {
    this.cargando.set(true);

    this.librosService.getAllLibros().subscribe({
      next: (data) => {
        this.libros.set(data);
        this.cargando.set(false);
        console.log(this.libros);
      },
      error: (err) => {
        console.log('Error al cargar los datos.', err);
        this.libros.set([]);
        this.cargando.set(false);
      },
    });
  }

  ngOnInit(): void {
    this.loadLibros();
  }
}
