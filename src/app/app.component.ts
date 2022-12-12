import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { Product } from './models/product.model';
import { Transaction } from './models/transaction.model';
import { RestockDialogComponent } from './restock-dialog/restock-dialog.component';
import { ProductsService } from './services/products.service';
import { TransactionsService } from './services/transactions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vending Machine';

  products: Product[] = [];

  activeTransaction: Transaction | undefined | null;

  cashAmount: number = 0;
  cardAmount: number = 0;
  totalAmount: number = 0;

  constructor(private productService: ProductsService, private transactionService: TransactionsService, private snackBar: MatSnackBar, public dialog: MatDialog) {
    forkJoin([
      this.productService.getProducts(),
      this.transactionService.getActiveTransaction(),
      this.transactionService.getPaymentAmount('Cash'),
      this.transactionService.getPaymentAmount('Card'),
      this.transactionService.getPaymentAmount('')
    ])
    .subscribe(([products, activeTrans, cashAmount, cardAmount, totalAmount]) => {
      this.products = products;
      this.activeTransaction = activeTrans;
      this.cashAmount = cashAmount;
      this.cardAmount = cardAmount;
      this.totalAmount = totalAmount;
    });
  }

  createTransaction(paymentType: string): void {
    this.transactionService.createTransaction(paymentType).subscribe({
      next: (transaction) => {
        this.activeTransaction = transaction;
      },
      error: (err) => {
        this.showError(err.message);
      }
    });
  }

  cancelTransaction(): void {
    this.transactionService.cancelTransaction().subscribe(
      {
        next: () => {
          this.activeTransaction = undefined;
        },
        error: (err) => {
          this.showError(err.message);
        }
      });
  }

  sellProduct(productId: number): void {
    this.productService.sellProduct(productId).subscribe({
      next: (product) => {
        this.activeTransaction = undefined;
        
        this.updateProduct(product);
      },
      error: (err) => {
        if (err.message !== 'Out of stock') {
          this.activeTransaction = undefined;
        }
        
        this.showError(err.message);
      }
    });
  }

  showRestockDialog(product: Product): void {
    const dialogRef = this.dialog.open(RestockDialogComponent, {data: product});

    dialogRef.afterClosed().subscribe(result => {
      this.productService.restockProduct(product.ID, result).subscribe({
        next: (product) => {
          this.updateProduct(product);
        },
        error: (err) => {
          this.showError(err.message);
        }
      });
    });
  }

  restockAll(): void {
    this.productService.restockAll().subscribe({
      next: () => {
        this.productService.getProducts().subscribe((products) => {
          this.products = products;
        })
      },
      error: (err) => {
        this.showError(err.message);
      }
    });
  }

  clearFunds(): void {
    this.transactionService.clearFunds().subscribe({
      next: () => {
        this.updatePaymentAmounts();
      },
      error: (err) => {
        this.showError(err.message);
      }
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, undefined, {duration: 3000});
  }

  private updateProduct(product: Product): void {
    let productIndex = this.products.findIndex(p => p.ID === product.ID);

    if (productIndex > -1) {
      this.products[productIndex] = product;
    }
  }

  private updatePaymentAmounts(): void {
    forkJoin([
      this.transactionService.getPaymentAmount('Cash'),
      this.transactionService.getPaymentAmount('Card'),
      this.transactionService.getPaymentAmount('')
    ])
    .subscribe(([cashAmount, cardAmount, totalAmount]) => {
      this.cashAmount = cashAmount;
      this.cardAmount = cardAmount;
      this.totalAmount = totalAmount;
    });
  }
}
