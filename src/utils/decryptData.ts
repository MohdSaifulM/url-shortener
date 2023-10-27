import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_CRYPTO_KEY as string;
const iv = CryptoJS.lib.WordArray.random(16);

export const decryptData = (data: any) => {
    try {
        return JSON.parse(
            CryptoJS.enc.Utf8.stringify(
                CryptoJS.AES.decrypt(data, secretKey, {
                    keySize: 128 / 8,
                    iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7,
                }),
            ),
        );
    } catch (e) {
        console.log(e);
    }
};
