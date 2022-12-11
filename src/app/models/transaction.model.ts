export class Transaction {
    ID: number | undefined;
    ProductID: number | null = null;
    PaymentType: string | undefined;
    CreatedDateTime: Date = new Date();
    LastUpdatedDateTime: Date = new Date();
    Amount: number | undefined;
    Status: string | undefined;
}
