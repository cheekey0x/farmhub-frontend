import axios from "axios";

export class StripeAPIService {
  private service: any;

  constructor() {
    this.service = axios.create({
      baseURL: "https://api.stripe.com/v1/"
    });
  }

  static createParams = (data: any) => {
    const formattedData = {};
    Object.keys(data).forEach((key) =>
      Object.assign(formattedData, { [`card[${key}]`]: data[key] })
    );
    return formattedData;
  };

  createPaymentMethod = async (token: string, data: any) => {
    const resPMStripe = await this.service.post("payment_methods", null, {
      params: {
        type: "card",
        ...StripeAPIService.createParams(data)
      },
      headers: {
        authority: "api.stripe.com",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "content-type": "application/x-www-form-urlencoded",
        origin: "https://js.stripe.com"
      }
    });
    return resPMStripe;
  };
}
