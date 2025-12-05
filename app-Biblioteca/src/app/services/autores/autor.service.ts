import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  private apiUrl = 'http://localhost:3000/autores';

  constructor(private http: HttpClient) {}

  getAutores() {
    return this.http.get<any[]>(this.apiUrl);
  }
}

/*
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
 */
