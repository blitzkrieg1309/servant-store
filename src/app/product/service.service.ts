import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servant } from '../models/servant.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Mengambil semua produk
  getProducts(): Observable<Servant[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`).pipe(
      map((products) =>
        products.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          imageUrl: product.image_url,
          class: product.class,
          createdAt: new Date(product.created_at),
          lore: product.lore,
          skill: product.skill,
          noblePhantasm: product.noble_phantasm,
          star: product.star,
        }))
      )
    );
  }

  // Mengambil detail produk by id
  getProductById(id: string): Observable<Servant> {
    return this.http.get<any>(`${this.baseUrl}/products/id/${id}`).pipe(
      map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageUrl: product.image_url,
        class: product.class,
        createdAt: new Date(product.created_at),
        lore: product.lore,
        skill: product.skill,
        noblePhantasm: product.noble_phantasm,
        star: product.star,
      }))
    );
  }

  // Menambahkan produk ke cart
  addToCart(data: { product_id: string; quantity: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/cart/add`, data);
  }
}
