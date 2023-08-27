const B64Encrypt = () => {
    const encodeText = (text?: string) => {
        if (!text) return;
        const encodedBuffer = Buffer.from(text, 'utf8').toString('base64');
        return encodedBuffer
    };

    const decodeText = (encoded?: string) => {
        if (!encoded) return;
        const decodedBuffer = Buffer.from(encoded, 'base64').toString('utf8');
        return decodedBuffer
    };

    return {
        encodeText,
        decodeText,
    };
};

export default B64Encrypt;