import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

//Importar servicios autores y editoriales
import { AutorService } from '../../services/autores/autor.service';
import { EditorialService } from '../../services/editoriales/editorial.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-libros-form',
  imports: [FormsModule, HttpClientModule, CommonModule],
  standalone: true,
  templateUrl: './libros-form.html',
  styleUrl: './libros-form.scss',
})
export class LibrosForm implements OnInit {
  // Para recargar la tabla
  @Output() onSave = new EventEmitter<void>();

  autores: any[] = [];
  editoriales: any[] = [];

  libroEnEdicion: boolean = false;
  idLibroEditar: number | null = null;

  model = {
    idLibro: null,
    titulo: '',
    anioLanzamiento: 0,
    ISBN: '',
    numeroPaginas: 0,
    stock: 0,
    sinopsis: '',
    idAutor: 0,
    idEditorial: 0,
  };

  constructor(
    private http: HttpClient,
    private autorService: AutorService,
    private editorialService: EditorialService
  ) {}

  ngOnInit() {
    this.cargarAutores();
    this.cargarEditoriales();
  }

  cargarAutores() {
    this.autorService.getAutores().subscribe({
      next: (res) => (this.autores = res),
      error: () => alert('Error al cargar autores'),
    });
  }

  cargarEditoriales() {
    this.editorialService.getEditoriales().subscribe({
      next: (res) => (this.editoriales = res),
      error: () => alert('Error al cargar editoriales'),
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    // Forzar que idAutor e idEditorial sean números
    this.model.idAutor = Number(this.model.idAutor);
    this.model.idEditorial = Number(this.model.idEditorial);

    if (this.libroEnEdicion && this.idLibroEditar !== null) {
      // UPDATE
      this.http
        .put(`http://localhost:3000/updateLibro/${this.idLibroEditar}`, this.model)
        .subscribe({
          next: () => {
            alert('Libro actualizado correctamente');
            this.resetForm(form);
            this.onSave.emit();
          },
          error: () => alert('Error al actualizar'),
        });
    } else {
      // INSERT
      this.http.post(`http://localhost:3000/saveLibro`, this.model).subscribe({
        next: () => {
          alert('Libro insertado correctamente');
          this.resetForm(form);
          this.onSave.emit();
        },
        error: () => alert('Error al insertar'),
      });
    }
  }

  resetForm(form: NgForm) {
    this.libroEnEdicion = false;
    this.idLibroEditar = null;

    this.model = {
      idLibro: null,
      titulo: '',
      anioLanzamiento: 0,
      ISBN: '',
      numeroPaginas: 0,
      stock: 0,
      sinopsis: '',
      idAutor: 0,
      idEditorial: 0,
    };

    form.resetForm();
  }

  cargarLibro(libro: any) {
    this.libroEnEdicion = true;
    this.idLibroEditar = libro.idLibro;

    this.model = { ...libro };
  }
}
