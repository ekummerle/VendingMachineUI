import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.url}GetProducts`).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('Unable to get products from the server - ' + err.error);

        if (err.status === 400) {
          return throwError(() => new Error(err.error));
        }
        else {
          return throwError(() => new Error('Unable to get products from the server.'));
        }
      })
    );
  }

  sellProduct(id: number): Observable<Product> {
    return this.http.post<Product>(`${environment.url}SellProduct/${id}`, null).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(`Unable to sell product with id = ${id}`, err.error);

        if (err.status === 400) {
          return throwError(() => new Error(err.error));
        }
        else {
          return throwError(() => new Error(`Unable to sell product with id = ${id}`));
        }
      })
    );
  }

  restockProduct(id: number, quantity: number): Observable<Product> {
    return this.http.post<Product>(`${environment.url}RestockProduct/${id}`, JSON.stringify(quantity), {headers: {'Content-Type': 'application/json'}}).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(`Unable to restock product with id = ${id}`, err.error);

        if (err.status === 400) {
          return throwError(() => new Error(err.error));
        }
        else {
          return throwError(() => new Error(`Unable to restock product with id = ${id}`));
        }
      })
    );
  }

  restockAll(): Observable<any> {
    return this.http.post(`${environment.url}RestockAll`, null).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('Unable to restock products.', err.error);

        if (err.status === 400) {
          return throwError(() => new Error(err.error));
        }
        else {
          return throwError(() => new Error('Unable to restock products.'));
        }
      })
    );
  }
}
