import { Component, OnInit, signal } from '@angular/core';
import { viewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { Libros } from '../../models/libros';
import { LibrosService } from '../../services/libros/libros-service';

import { LibrosForm } from '../libros-form/libros-form';

@Component({
  selector: 'app-libros-list',
  imports: [LibrosForm, HttpClientModule, CommonModule],
  standalone: true,
  templateUrl: './libros-list.html',
  styleUrl: './libros-list.scss',
})
export class LibrosList implements OnInit {
  formComponent = viewChild(LibrosForm); //Hacer update
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

  editarLibro(libro: Libros) {
    this.formComponent()?.cargarLibro(libro);
    console.log('Libro a editar:', libro);
  }

  //Regargar tabla
  recargarTabla() {
    this.loadLibros();
  }
}
