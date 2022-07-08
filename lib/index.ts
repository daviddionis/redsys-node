import { processPaymentApplePay } from "./providers/redsysApi.providers";
import { Currency } from "./types/Currency";
import { Mode } from "./types/Mode";
import PaymentApplePay from "./types/PaymentApplePay";
import { jsonToBase64 } from "./utils/base64.utils";
import { generateHmac256ToBase64, generateTripleDES } from "./utils/crypto.utils";

export interface RedsysInstanceModel {
    merchantCode: string;
    secretKey: string;
    currency: Currency;
    terminal: string;
    mode: Mode;
}

class Redsys implements RedsysInstanceModel {
    public merchantCode: string;
    public secretKey: string;
    public currency: Currency;
    public terminal: string;
    public mode: Mode;

    constructor(merchantCode: string, secretKey: string, currceny: Currency.EUR, terminal: string = '1', mode: Mode = Mode.TESTING) {
        this.merchantCode = merchantCode;
        this.secretKey = secretKey;
        this.currency = currceny;
        this.terminal = terminal;
        this.mode = mode;
    }

    private generateFinalPayloadForApplePay(paymentData: PaymentApplePay): any {
        return {
            "DS_MERCHANT_MERCHANTCODE": this.merchantCode,
            "DS_MERCHANT_TERMINAL": this.terminal,
            "DS_MERCHANT_CURRENCY": this.currency,
            ...paymentData.generatePayloadRedsys()
        };
    }

    private signPayload(payload: any, orderNumber: string): any {
        const payloadBase64 = jsonToBase64(payload);

        const orderKey = generateTripleDES(orderNumber, this.secretKey);

        const signature = generateHmac256ToBase64(payloadBase64, orderKey);

        return {
            "Ds_MerchantParameters": payloadBase64,
            "Ds_Signature": signature,
            "Ds_SignatureVersion": "HMAC_SHA256_V1"
        }
    }

    public executeApplePay(paymentData: PaymentApplePay): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.mode == Mode.TESTING)
                    throw new Error("Redsys is in TESTING mode. You must use production mode to execute Apple Pay since Redsys not support it in TESTING mode.");

                const payloadSigned = this.signPayload(this.generateFinalPayloadForApplePay(paymentData), paymentData.orderNumber);

                const response = await processPaymentApplePay(payloadSigned);
                // TODO: Check if response is valid and decoded
                return resolve(response);
            } catch (err) {
                return reject(err);
            }

        });
    }

}

export default Redsys;