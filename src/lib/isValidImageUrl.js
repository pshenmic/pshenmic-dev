export const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    
    try {
        if (url.startsWith('/')) {
            const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
            return validExtensions.some(ext => url.toLowerCase().endsWith(ext));
        }

        const urlPattern = new RegExp(
            '^(https?:\\/\\/)' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '\\.(jpg|jpeg|png|gif|webp|svg)$',
            'i'
        );

        return urlPattern.test(url);
    } catch {
        return false;
    }
};