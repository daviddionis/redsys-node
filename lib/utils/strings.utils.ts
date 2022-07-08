import { Buffer } from 'buffer';

export const zeroPad = (buf: any, blocksize: any): Buffer => {
    const buffer = typeof buf === 'string' ? Buffer.from(buf, 'utf8') : buf;
    const pad = Buffer.alloc((blocksize - (buffer.length % blocksize)) % blocksize, 0);
    return Buffer.concat([buffer, pad]);
}

export const zeroUnpad = (buf: any, blocksize: any) => {
    let lastIndex = buf.length;
    while (lastIndex >= 0 && lastIndex > buf.length - blocksize - 1) {
        lastIndex -= 1;
        if (buf[lastIndex] !== 0) {
            break;
        }
    }
    return buf.slice(0, lastIndex + 1).toString('utf8');
}

export const replaceSlashByUnderscore = (str: string) => str.replace(/\//g, '_');

export const replacePlusByLess = (str: string) => str.replace(/\+/g, '-');


export const strToHex = (str: string) => {
    let hex = '';
    for (var i = 0, l = str.length; i < l; i++)
        hex += str.charCodeAt(i).toString(16);

    return hex;
}