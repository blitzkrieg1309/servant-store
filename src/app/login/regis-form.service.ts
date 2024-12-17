import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisFormService {
  private apiUrl = 'http://localhost:8080/register';

  constructor(private http: HttpClient) {}

  register(data: {
    username: string;
    password: string;
    email: string;
  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
