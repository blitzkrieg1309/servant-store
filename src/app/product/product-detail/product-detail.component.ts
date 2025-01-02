import { Component, OnInit, signal } from '@angular/core';
import { Servant } from '../../models/servant.model';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,

  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  servant: Servant = {
    id: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    class: '',
    createdAt: new Date(),
    lore: '',
    skill: '',
    noblePhantasm: '',
    star: 0,
  };

  quantity = signal(1);
  isLoggedIn: boolean = false;

  constructor(
    private productService: ServiceService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('productId');
      if (productId) {
        this.fetchDetail(productId);
      }
    });

    this.isLoggedIn = this.authService.isLoggedIn();

    // cek apakah token expired
    // if (this.authService.isTokenExpired()) {
    //   this.authService.removeToken();
    //   alert('Session expired, please login again');
    //   this.router.navigate(['/login']);
    // }
  }

  fetchDetail(productId: string): void {
    this.productService.getProductById(productId).subscribe(
      (data: Servant) => {
        this.servant = data;
      },
      (error) => {
        console.error('Error fetching Servant', error);
      }
    );
  }

  submitToCart(): void {
    if (this.authService.isTokenExpired()) {
      this.authService.removeToken();
      alert('Session expired, please login again');
      this.router.navigate(['/login']);
      return;
    }

    this.productService
      .addToCart({
        product_id: this.servant.id,
        quantity: this.quantity(),
      })
      .subscribe(
        () => {
          alert('Added to cart successfully!');
        },
        (error) => {
          console.error('Error adding to cart', error);
          alert('Failed to add item to cart.');
        }
      );
  }

  redirectToLogin(): void {
    alert('Please login first');
    this.router.navigate(['/login']);
  }

  decrementQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.set(this.quantity() - 1);
    }
  }

  incrementQuantity(): void {
    this.quantity.set(this.quantity() + 1);
  }
}
