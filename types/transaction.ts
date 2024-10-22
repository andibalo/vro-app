export enum TransactionStatus {
    Success = "SUCCESS",
    Failed = "FAILED",
}

export interface ITransaction {
    id: string;
    type: string;
    name: string;
    value: number;
    status: TransactionStatus;
    createdAt: string;
    operatorProviderName?: string;
}