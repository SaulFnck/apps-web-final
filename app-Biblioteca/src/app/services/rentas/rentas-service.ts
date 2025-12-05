import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RentasService {
  private apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllRentas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/getAllRentas`);
  }

  saveRenta(renta: any): Observable<any> {
    return this.http.post(`${this.apiURL}/saveRenta`, renta);
  }

  updateRenta(id: number, renta: any): Observable<any> {
    return this.http.put(`${this.apiURL}/updateRenta/${id}`, renta);
  }

  deleteRenta(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/deleteRenta/${id}`);
  }
}
