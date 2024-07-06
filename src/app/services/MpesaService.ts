import axios from "axios";
import crypto from "crypto";
import constants from "constants";
import Logger from "@/utils/Logger";
import { PHONE_PREFIX } from "@/utils/Constants";

interface IMpesaConfig {
  baseUrl: string;
  apiKey: string;
  publicKey: string;
  origin: string;
  serviceProviderCode: string;
}

export interface IMpesaExternalConfig {
  MPESA_API_HOST: string;
  MPESA_API_KEY: string;
  MPESA_PUBLIC_KEY: string;
  MPESA_ORIGIN: string;
  MPESA_SERVICE_PROVIDER_CODE: string;
}

export interface IPaymentInfo {
  amount: number;
  msisdn: string;
  transactionRef: string;
  thirdpartyRef: string;
}

export interface IRevertPaymentInfo {
  transactionID: string;
  securityCredential: string;
  initiatorIdentifier: string;
  thirdpartyRef: string;
  serviceProviderCode: string;
  reversalAmount?: number;
}

export default class MpesaService {
  private mpesaConfig: IMpesaConfig;
  private LOG_TAG = "MpesaClient";

  constructor(externalConfig?: IMpesaExternalConfig) {
    this.mpesaConfig = this.initializePaymentConfig(externalConfig);
  }

  public async customerToBusiness(paymentInfo: IPaymentInfo) {
    Logger.log(this.LOG_TAG, "Making customer to business payment", [paymentInfo]);
    const phoneWithPrefix = `${PHONE_PREFIX}${paymentInfo.msisdn}`;

    try {
      const response = await axios({
        method: "post",
        url: "https://" + this.mpesaConfig.baseUrl + ":18352/ipg/v1x/c2bPayment/singleStage/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this._getBearerToken(this.mpesaConfig.publicKey, this.mpesaConfig.apiKey),
          Origin: this.mpesaConfig.origin,
        },
        data: {
          input_TransactionReference: paymentInfo.transactionRef,
          input_CustomerMSISDN: phoneWithPrefix,
          input_Amount: paymentInfo.amount + "",
          input_ThirdPartyReference: paymentInfo.thirdpartyRef,
          input_ServiceProviderCode: this.mpesaConfig.serviceProviderCode + "",
        },
      });
      return response.data;
    } catch (e: any) {
      Logger.error(this.LOG_TAG, "Error making customer to business payment", e);
      if (e && e.response && e.response.data) {
        throw e.response.data;
      } else {
        throw e;
      }
    }
  }

  public async businessToCustomer(paymentInfo: IPaymentInfo) {
    const phoneWithPrefix = `${PHONE_PREFIX}${paymentInfo.msisdn}`;

    Logger.log(this.LOG_TAG, "Making business to customer payment", [paymentInfo, phoneWithPrefix]);

    try {
      const response = await axios({
        method: "post",
        url: "https://" + this.mpesaConfig.baseUrl + ":18345/ipg/v1x/b2cPayment/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this._getBearerToken(this.mpesaConfig.publicKey, this.mpesaConfig.apiKey),
          Origin: this.mpesaConfig.origin,
        },
        data: {
          input_TransactionReference: paymentInfo.transactionRef,
          input_CustomerMSISDN: phoneWithPrefix,
          input_Amount: `${paymentInfo.amount}`,
          input_ThirdPartyReference: `${paymentInfo.thirdpartyRef}`,
          input_ServiceProviderCode: this.mpesaConfig.serviceProviderCode + "",
        },
      });
      return response.data;
    } catch (e: any) {
      Logger.error(this.LOG_TAG, "Error making business to customer payment", e);

      if (e && e.response && e.response.data) {
        throw e.response.data;
      } else {
        throw e;
      }
    }
  }

  public async revertTransaction(
    transactionInfo: IRevertPaymentInfo,
    useExternalConfig: boolean,
    externalConfig?: IMpesaExternalConfig,
  ) {
    Logger.log(this.LOG_TAG, "Reverting transaction", [transactionInfo, useExternalConfig, externalConfig]);
    try {
      const response = await axios({
        method: "post",
        url: "https://" + this.mpesaConfig.baseUrl + ":18345/ipg/v1x/reversal/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this._getBearerToken(this.mpesaConfig.publicKey, this.mpesaConfig.apiKey),
          Origin: this.mpesaConfig.origin,
        },
        data: {
          input_TransactionID: transactionInfo.transactionID,
          input_SecurityCredential: `${transactionInfo.securityCredential}`,
          input_InitiatorIdentifier: `${transactionInfo.initiatorIdentifier}`,
          input_ThirdPartyReference: `${transactionInfo.thirdpartyRef}`,
          input_ServiceProviderCode: this.mpesaConfig.serviceProviderCode + "",
          input_ReversalAmount: `${transactionInfo.reversalAmount}`,
        },
      });
      return response.data;
    } catch (e: any) {
      Logger.error(this.LOG_TAG, "Error reverting transaction", e);
      if (e && e.response && e.response.data) {
        throw e.response.data;
      } else {
        throw e;
      }
    }
  }

  private _getBearerToken(mpesaPublicKey: string, mpesaApiKey: string) {
    const publicKey = "-----BEGIN PUBLIC KEY-----\n" + mpesaPublicKey + "\n" + "-----END PUBLIC KEY-----";
    const buffer = Buffer.from(mpesaApiKey);
    const encrypted = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: constants.RSA_PKCS1_PADDING,
      },
      buffer,
    );
    return encrypted.toString("base64");
  }

  private initializePaymentConfig(externalConfig?: IMpesaExternalConfig): IMpesaConfig {
    let mpesaConfig: IMpesaConfig;

    if (externalConfig) {
      mpesaConfig = {
        baseUrl: externalConfig.MPESA_API_HOST,
        apiKey: externalConfig.MPESA_API_KEY,
        publicKey: externalConfig.MPESA_PUBLIC_KEY,
        origin: externalConfig.MPESA_ORIGIN,
        serviceProviderCode: externalConfig.MPESA_SERVICE_PROVIDER_CODE,
      };
    } else {
      mpesaConfig = {
        baseUrl: `${process.env.MPESA_API_HOST}`,
        apiKey: `${process.env.MPESA_API_KEY}`,
        publicKey: `${process.env.MPESA_PUBLIC_KEY}`,
        origin: `${process.env.MPESA_ORIGIN}`,
        serviceProviderCode: `${process.env.MPESA_SERVICE_PROVIDER_CODE}`,
      };
    }

    this.validateConfig(mpesaConfig);
    return mpesaConfig;
  }

  private required_config_arg(argName: string) {
    return "Please provide a valid " + argName + " in the configuration when calling initializeApi()";
  }

  private validateConfig(configParams: IMpesaConfig) {
    if (!configParams.baseUrl) {
      throw this.required_config_arg("baseUrl");
    }
    if (!configParams.apiKey) {
      throw this.required_config_arg("apiKey");
    }
    if (!configParams.publicKey) {
      throw this.required_config_arg("publicKey");
    }
    if (!configParams.origin) {
      throw this.required_config_arg("origin");
    }
    if (!configParams.serviceProviderCode) {
      throw this.required_config_arg("serviceProviderCode");
    }
  }
}
