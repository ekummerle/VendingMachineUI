import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Product } from './models/product.model';
import { Transaction } from './models/transaction.model';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vending Machine';

  products: Product[] = [];

  transactions: Transaction[] = [];

  activeTransaction!: Transaction;;

  constructor(private productService: ProductsService) {
    forkJoin([
      this.productService.getProducts()
    ])
    .subscribe(([products]) => {
      this.products = products;
    });
  }
}
