import { Component, OnInit } from '@angular/core';
import { Servant } from '../../models/servant.model';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  servants: Servant[] = [];
  filteredServants: Servant[] = [];
  searchQuery: string = '';
  classFilter: string = 'all';
  starFilter: string = 'all';
  currentPage: number = 1;
  itemsPerPage: number = 20;

  constructor(private productService: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Servant[]) => {
        console.log('Servants fetched:', data);
        this.servants = data;
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching Servants', error);
      }
    );
  }

  applyFilters(): void {
    let filtered = [...this.servants];

    // filter by star
    if (this.starFilter !== 'all') {
      const minStar = parseInt(this.starFilter, 10);
      filtered = filtered.filter((servant) => servant.star === minStar);
    }

    // filter by class
    if (this.classFilter !== 'all') {
      filtered = filtered.filter(
        (servant) =>
          servant.class.toLowerCase() === this.classFilter.toLowerCase()
      );
    }

    // filter by search query
    if (this.searchQuery.trim() !== '') {
      filtered = filtered.filter((servant) =>
        servant.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredServants = filtered.slice(startIndex, endIndex);
  }

  onSearch(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.searchQuery = value;
    this.applyFilters();
  }

  onClassFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.classFilter = value;
    this.applyFilters();
  }

  onStarFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.starFilter = value;
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  goToProductDetail(productId: string): void {
    this.router.navigate(['/servants', productId]);
  }
}
