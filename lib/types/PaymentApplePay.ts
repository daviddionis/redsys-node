import { strToHex } from "../utils/strings.utils";
import { TransactionType } from "./TransactionType";

export enum ApplePayOrigin {
    InApp = 'InApp',
    Web = 'WEB'
}

export interface PaymentApplePayModel {
    orderNumber: string;
    token: JSON | string;
    amount: number;
    origin: ApplePayOrigin;
}

class PaymentApplePay implements PaymentApplePayModel {
    public orderNumber: string;
    public token: JSON | string;
    public amount: number;
    public origin: ApplePayOrigin;

    constructor(orderNumber: string, token: string, amount: number, origin: ApplePayOrigin = ApplePayOrigin.InApp) {
        this.orderNumber = orderNumber;
        this.token = token;
        this.amount = amount;
        this.origin = origin;
    }

    private tokenToHex(): string {
        let jsonStringified = '';
        if (typeof this.token === 'string') jsonStringified = this.token;
        else jsonStringified = JSON.stringify(this.token);
        return strToHex(jsonStringified);
    }

    public generatePayloadRedsys(): any {
        return {
            DS_MERCHANT_AMOUNT: (this.amount * 100).toFixed(0),
            DS_MERCHANT_ORDER: this.orderNumber,
            DS_MERCHANT_TRANSACTIONTYPE: TransactionType.AUTHORIZATION,
            DS_MERCHANT_DIRECTPAYMENT: 'true', // however it does not appear in the official documentation, comercia global payments told me that this is needed if TPV is not mix (secure and not secure)
            DS_XPAYDATA: this.tokenToHex(),
            DS_XPAYTYPE: "Apple",
            DS_XPAYORIGIN: this.origin
        };
    }

}

export default PaymentApplePay; 