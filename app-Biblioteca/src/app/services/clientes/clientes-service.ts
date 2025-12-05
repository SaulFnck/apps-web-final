import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/getAllClientes`);
  }

  saveCliente(cliente: any): Observable<any> {
    return this.http.post(`${this.apiURL}/saveCliente`, cliente);
  }

  updateCliente(id: number, cliente: any): Observable<any> {
    return this.http.put(`${this.apiURL}/updateCliente/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/deleteCliente/${id}`);
  }
}
