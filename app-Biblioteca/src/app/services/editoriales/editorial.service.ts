import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EditorialService {
  private apiUrl = 'http://localhost:3000/editoriales';

  constructor(private http: HttpClient) {}

  getEditoriales() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
