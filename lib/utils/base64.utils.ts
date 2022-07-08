
export const jsonToBase64 = (jsonData: JSON): string => Buffer.from(JSON.stringify(jsonData), 'utf-8').toString('base64');