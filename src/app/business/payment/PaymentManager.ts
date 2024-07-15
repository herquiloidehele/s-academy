import Logger from "@/utils/Logger";
import { IPaymentRequest, PaymentMethods } from "@/app/business/payment/PaymentData";
import MpesaService, { IPaymentInfo } from "@/app/services/MpesaService";

class PaymentManager {
  private readonly LOG_TAG = "PaymentManager";

  private readonly paymentFee = {
    [PaymentMethods.MPESA]: 0.03,
  };

  public async payCourse(paymentRequest: IPaymentRequest) {
    switch (paymentRequest.paymentMethod) {
      case PaymentMethods.MPESA:
        return await this.processMpesaPayment(paymentRequest);
      default:
        Logger.error(this.LOG_TAG, `Payment method not supported: ${paymentRequest.paymentMethod}`);
        return Promise.reject("Payment method not supported");
    }
  }

  public getAmountWithFee(amount: number, paymentMethod: PaymentMethods) {
    return amount + this.getFeeAmount(amount, paymentMethod);
  }

  public getFeeAmount(amount: number, paymentMethod: PaymentMethods) {
    return amount * this.paymentFee[paymentMethod];
  }

  private async processMpesaPayment(paymentData: IPaymentRequest) {
    Logger.debug(this.LOG_TAG, `Paying course`, [paymentData]);

    try {
      const mpesaService = new MpesaService();
      const amountWithFee = this.getAmountWithFee(paymentData.amount, paymentData.paymentMethod);

      Logger.debug(this.LOG_TAG, `Amount with fee`, [amountWithFee]);

      const paymentInfo: IPaymentInfo = {
        amount: amountWithFee,
        msisdn: paymentData.phoneNumber,
        transactionRef: new Date().getTime().toString(),
        thirdpartyRef: new Date().getTime().toString(),
      };

      const paymentResponse = await mpesaService.customerToBusiness(paymentInfo);

      Logger.debug(this.LOG_TAG, `Payment successful`, [paymentResponse]);
      return paymentResponse;
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error paying course`, error);
      return Promise.reject(error);
    }
  }
}

export default new PaymentManager();
