export const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    try {
        if (url.startsWith('/')) {
            return true;
        }
        const urlPattern = /^(https?:\/\/)([\w.-]+)([/\w.-]*)*\/?$/;
        return urlPattern.test(url);
    } catch {
        return false;
    }
}