import { Component, inject } from '@angular/core';

import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { EMPTY, catchError, tap } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, NgClass, ProductDetailComponent],
})
export class ProductListComponent {
  private productService = inject(ProductService);
  pageTitle = 'Products';
  errorMessage = '';

  // Products
  readonly products$ = this.productService
    .products$
    .pipe(
      tap(() => console.log('In component pipeline')),
      catchError((err) => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  // Selected product id to highlight the entry
  selectedProductId: number = 0;
  readonly selectedProductId$ = this.productService.productSelected$;

  onSelected(productId: number): void {
    this.productService.productSelected(productId);
  }
}
