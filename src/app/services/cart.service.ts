import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/servant.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8080/cart';

  constructor(private http: HttpClient) {}

  fetchCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}`);
  }

  updateCart(payload: {
    product_id: string;
    quantity: number;
  }): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, payload);
  }

  deleteCart(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  checkout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, {});
  }
}
