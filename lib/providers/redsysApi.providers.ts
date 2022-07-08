import axios from 'axios';
import { RedsysURLs } from '../constants/urls';

export const processPaymentApplePay = (finalPayload: any): Promise<any> =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(RedsysURLs.Production.Rest.TrataPeticion, finalPayload);
            return resolve(response.data);
        } catch (err) {
            return reject(err);
        }
    });