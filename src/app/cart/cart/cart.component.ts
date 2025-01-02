import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../product/service.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,

  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId: string | null;
  quantity: number = 0;
  totalPrices: number = 0;

  constructor(
    private productService: ServiceService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.userId = this.authService.getUserIdFromToken();
  }

  ngOnInit(): void {
    this.checkExpiredToken();
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.fetchCart().subscribe((cartItems: any[]) => {
      this.cartItems = cartItems;
      this.calculateTotalPrice();
    });
  }

  addToCart(productId: string, quantity: number): void {
    this.checkExpiredToken();
    if (!this.userId) {
      alert('Please log in to add items to your cart.');
      return;
    }

    this.productService
      .addToCart({ product_id: productId, quantity })
      .subscribe(
        (response) => {
          alert('Item successfully added to cart!');
          this.loadCart();
        },
        (error) => {
          console.error('Error adding to cart:', error);
          alert('Failed to add item to cart.');
        }
      );
  }

  calculateTotalPrice(): void {
    this.totalPrices = this.cartItems.reduce((total, item) => {
      const price = parseFloat(item.product.price);
      return total + price * item.quantity;
    }, 0);
  }

  deleteCartItem(id: string): void {
    this.checkExpiredToken();
    this.cartService.deleteCart(id).subscribe(
      (response) => {
        this.cartItems = this.cartItems.filter((item) => item.id !== id); // remove item from cartItems
        this.calculateTotalPrice();
        this.loadCart();
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }

  checkout(): void {
    this.checkExpiredToken();
    this.cartService.checkout().subscribe(
      (response) => {
        alert('Checkout successful!');
        this.loadCart();
      },
      (error) => {
        console.error('Error checking out:', error);
        alert('Failed to checkout.');
      }
    );
  }

  checkExpiredToken(): void {
    if (this.authService.isTokenExpired()) {
      this.authService.removeToken();
      alert('Session expired, please login again');
      this.router.navigate(['/login']);
    }
  }
}
