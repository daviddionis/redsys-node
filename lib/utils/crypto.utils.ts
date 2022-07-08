import { Buffer } from 'buffer';
import crypto from 'crypto';
import { zeroPad } from './strings.utils';

export const generateTripleDES = (str: string, key: string): string => {
    const secretKey = Buffer.from(key, 'base64');
    const iv = Buffer.alloc(8, 0);
    const cipher: any = crypto.createCipheriv('des-ede3-cbc', secretKey, iv);
    cipher.setAutoPadding(false);
    return cipher.update(zeroPad(str, 8), 'utf8', 'base64')
        + cipher.final('base64');
}

export const generateHmac256ToBase64 = (data: any, key: any): string => {
    return crypto.createHmac('sha256', Buffer.from(key, 'base64'))
        .update(data)
        .digest('base64');
}