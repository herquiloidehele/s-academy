import Axios, { AxiosInstance, AxiosResponse } from "axios";
import IHttpInterface, {
  HttpMethods,
  IHttpRequestConfig,
  IHttpResponse,
} from "@/app/backend/services/rest/IHttpInterface";
import Logger from "@/utils/Logger";

class HttpInterface implements IHttpInterface {
  private readonly LOG_TAG: string = "HttpInterface";

  private axios: AxiosInstance;
  private outboundRequestInterceptFn?: Function;
  private requestSuccessInterceptFn?: Function;
  private errorInterceptFn?: Function;
  private errorInterceptStatusCodes: number[] = [];

  constructor(requestTimeout?: number) {
    this.axios = Axios.create({
      timeout: requestTimeout || 10000,
      validateStatus: () => {
        return true;
      },
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    // Intercept requests to allow refreshing the JWT
    this.axios.interceptors.request.use(this.handleOutboundRequestIntercept.bind(this));

    // Intercept responses to allow handling global errors
    this.axios.interceptors.response.use(this.handleErrorIntercept.bind(this));

    Logger.debug(this.LOG_TAG, "Initialized.", requestTimeout);
  }

  send(request: IHttpRequestConfig): Promise<IHttpResponse> {
    Logger.debug(this.LOG_TAG, "Sending " + request.httpMethod + " request... " + request.url, [request]);
    this.processRequestConfig(request);

    switch (request.httpMethod) {
      case HttpMethods.GET:
        return this.axios.get(request.url, request);
      case HttpMethods.POST:
        return this.axios.post(request.url, request.data, request);
      case HttpMethods.DELETE:
        return this.axios.delete(request.url, request);
      case HttpMethods.PUT:
        return this.axios.put(request.url, request.data, request);
      case HttpMethods.PATCH:
        return this.axios.patch(request.url, request.data, request);
      case HttpMethods.HEAD:
        return this.axios.head(request.url, request);

      default:
        Logger.error(this.LOG_TAG, "Unsupported HTTP Method.", [request]);
        return Promise.reject();
    }
  }

  setAuthorizationValue(authValue?: string): void {
    if (this.axios.defaults && this.axios.defaults.headers && this.axios.defaults.headers.common) {
      if (authValue) {
        this.axios.defaults.headers.common["Authorization"] = authValue;
        Logger.debug(this.LOG_TAG, "Set authorization header.");
      } else {
        delete this.axios.defaults.headers.common["Authorization"];
        Logger.debug(this.LOG_TAG, "Cleared authorization header.");
      }
    }
  }

  setRequestAuthorizationValue(requestConfig: IHttpRequestConfig, authValue?: string): void {
    if (authValue) {
      requestConfig.headers!["Authorization"] = authValue;
      Logger.debug(this.LOG_TAG, "Authorization header updated for request.", requestConfig);
    } else {
      delete requestConfig.headers!["Authorization"];
      Logger.debug(this.LOG_TAG, "Cleared authorization header for request.", requestConfig);
    }
  }

  setRequestSuccessInterceptor(interceptFn?: Function): void {
    this.requestSuccessInterceptFn = interceptFn;
  }

  setRequestErrorInterceptor(statusCodes: number[], interceptFn?: Function): void {
    this.errorInterceptFn = interceptFn;
    this.errorInterceptStatusCodes = statusCodes;
  }

  setOutboundRequestInterceptor(interceptFn?: Function): void {
    this.outboundRequestInterceptFn = interceptFn;
  }

  private handleOutboundRequestIntercept(requestConfig: any): Promise<any> {
    if (this.outboundRequestInterceptFn) {
      return this.outboundRequestInterceptFn(requestConfig);
    }

    return Promise.resolve(requestConfig);
  }

  private handleErrorIntercept(response: AxiosResponse): AxiosResponse {
    if (this.errorInterceptFn && response && this.errorInterceptStatusCodes.includes(response.status)) {
      Logger.debug(this.LOG_TAG, "Error status code intercepted: " + response.status, [response]);
      this.errorInterceptFn(response.status);
    } else if (this.requestSuccessInterceptFn && response) {
      this.requestSuccessInterceptFn(response);
    }

    return response;
  }

  private processRequestConfig(requestConfig: IHttpRequestConfig): void {
    if (requestConfig.skipAuthentication) {
      requestConfig.transformRequest = [
        (data: any, headers: any) => {
          delete headers["Authorization"];

          if (data) {
            return JSON.stringify(data);
          }
        },
      ];
    }
  }
}

export default HttpInterface;
