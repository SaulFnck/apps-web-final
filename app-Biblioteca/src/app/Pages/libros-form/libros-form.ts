import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-libros-form',
  imports: [FormsModule, HttpClientModule],
  standalone: true,
  templateUrl: './libros-form.html',
  styleUrl: './libros-form.scss',
})
export class LibrosForm {
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
    idEditorial: '',
  };

  private apiUrl = 'http://localhost:3000/saveLibro';

  constructor(private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    if (this.libroEnEdicion && this.idLibroEditar !== null) {
      // UPDATE
      this.http
        .put(`http://localhost:3000/updateLibro/${this.idLibroEditar}`, this.model)
        .subscribe({
          next: () => {
            alert('Libro actualizado correctamente');
            this.resetForm(form);
          },
          error: () => {
            alert('Error al actualizar');
          },
        });
    } else {
      // INSERT (POST)
      this.http.post('http://localhost:3000/saveLibro', this.model).subscribe({
        next: () => {
          alert('Libro insertado correctamente');
          this.resetForm(form);
        },
        error: () => {
          alert('Error al insertar');
        },
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
      idEditorial: '',
    };

    form.resetForm();
  }

  cargarLibro(libro: any) {
    this.libroEnEdicion = true;
    this.idLibroEditar = libro.idLibro;

    this.model = { ...libro };
  }
}
