import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  createTransaction(paymentType: string): Observable<Transaction> {
    return this.http.post<Transaction>(`${environment.url}CreateTransaction`, paymentType).pipe(
      catchError((err) => {
        console.error(`Unable to create transaction for payment type = ${paymentType}`, err.message);

        return throwError(() => new Error(`Unable to create transaction for payment type = ${paymentType}.`));
      })
    );
  }

  cancelTransaction(): Observable<Transaction> {
    return this.http.post<Transaction>(`${environment.url}CancelTransaction`, null).pipe(
      catchError((err) => {
        console.error('Unable to cancel transaction', err.message);

        return throwError(() => new Error('Unable to cancel transaction.'));
      })
    );
  }

  clearFunds(): Observable<any> {
    return this.http.post(`${environment.url}ClearFunds`, null).pipe(
      catchError((err) => {
        console.error('Unable to clear funds', err.message);

        return throwError(() => new Error('Unable to cleear funds'));
      })
    );
  }

  getPaymentAmount(paymentType: string): Observable<number> {
    return this.http.get<number>(`${environment.url}GetPaymentAmount`).pipe(
      catchError((err) => {
        console.error(`Unable to get payment amount for payment type = ${paymentType}`, err.message);

        return throwError(() => new Error(`Unable to get payment amount for payment type = ${paymentType}.`));
      })
    );
  }
}
