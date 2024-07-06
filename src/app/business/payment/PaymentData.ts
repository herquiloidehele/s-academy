export enum PaymentMethods {
  MPESA = "mpesa",
}

export interface IPaymentRequest {
  paymentMethod: PaymentMethods;
  amount: number;
  phoneNumber: string;
}
