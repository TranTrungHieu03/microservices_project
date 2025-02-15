export const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const randomBuffer = new Uint8Array(characters.length)
    crypto.getRandomValues(randomBuffer)
    for (let i = 0; i < length; i++) {
        result += characters.charAt(randomBuffer[i] * characters.length);
    }
    return result;
    
}