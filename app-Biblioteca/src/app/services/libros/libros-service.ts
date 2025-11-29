import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libros } from '../../models/libros';

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  private apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getAllLibros(): Observable<Libros[]> {
    return this.http.get<Libros[]>(`${this.apiURL}/getAllLibros`);
  }
}
