import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_CRYPTO_KEY as string;
const iv = CryptoJS.lib.WordArray.random(16);

export const encryptData = (data: any) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey, {
        keySize: 128 / 8,
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
};
