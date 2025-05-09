export const encryptDecrypt = () => {

    const appKey = import.meta.env.VITE_APP_KEY;


    const encryptData = (data) => {
        const jsonData = JSON.stringify(data);
        const combinedData = jsonData + appKey;

        const base64Encoded = btoa(unescape(encodeURIComponent(combinedData)));
        return base64Encoded;
    }


    const decryptData = (encodedData) => {
        try {
            const decoded = decodeURIComponent(escape(atob(encodedData)));
            const jsonPart = decoded.slice(0, -appKey.length);
            return JSON.parse(jsonPart);
        } catch (error) {
            throw error
        }
    }
    return {encryptData, decryptData };
};
