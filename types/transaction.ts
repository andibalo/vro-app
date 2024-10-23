export enum TransactionStatus {
    Success = "SUCCESS",
    Failed = "FAILED",
}

export interface ITransaction {
    id: string;
    number: string;
    type: string;
    name: string;
    value: number;
    status: TransactionStatus;
    createdAt: string;
    phoneOperatorName?: string;
    phoneOperatorImgURL?: string;
}