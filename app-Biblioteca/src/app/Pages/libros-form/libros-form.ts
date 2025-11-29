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
  model = {
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

    this.http.post(this.apiUrl, this.model).subscribe({
      next: (res) => {
        console.log('Datos registrados de manera exitosa');
        alert('Datos registrados de manera exitosa');
        form.resetForm();
      },
      error: (err) => {
        console.log('Transacción fallida');
        alert('Transacción fallida');
      },
    });
  }
}
