import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../models/product.model';
import { Inject } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-restock-dialog',
  templateUrl: './restock-dialog.component.html',
  styleUrls: ['./restock-dialog.component.css']
})
export class RestockDialogComponent {

  quantity!: number;

  constructor(public dialogRef: MatDialogRef<RestockDialogComponent>, @Inject(MAT_DIALOG_DATA) public product: Product, private snackBar: MatSnackBar) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    let result = Number(this.quantity);

    if (isNaN(result)) {
      this.snackBar.open('Please enter a valid value', undefined, {duration: 3000});
    }
    else {
      this.dialogRef.close(this.quantity);
    }
  }

}
