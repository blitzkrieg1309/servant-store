import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService {
  private loginUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, data).pipe(
      tap((response) => {
        if (response.token) {
          this.authService.setToken(response.token);
        }
      })
    );
  }
}
