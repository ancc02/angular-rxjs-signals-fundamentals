import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { NgIf, NgFor, NgClass } from '@angular/common';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import {Subscription, tap} from 'rxjs'

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent]
})

export class ProductListComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  pageTitle = 'Products';
  errorMessage = '';
  sub !: Subscription;

  // Products
  products: Product[] = [];

  // Selected product id to highlight the entry
  selectedProductId: number = 0;

  ngOnInit(): void{
    this.sub = this.productService.getProducts()
    .pipe(tap(() => console.log("In component pipelin")))
    .subscribe(products => this.products = products );
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
