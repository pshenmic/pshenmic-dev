export const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') {
        console.log('Invalid input:', url);
        return false;
    }
    
    try {
        const cleanUrl = url.split('?')[0];
        
        if (cleanUrl.startsWith('data:image/')) {
            return true;
        }

        if (cleanUrl.startsWith('/')) {
            const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
            return validExtensions.some(ext => cleanUrl.toLowerCase().endsWith(ext));
        }

        if (cleanUrl.includes('github.com')) {
            const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
            return validExtensions.some(ext => cleanUrl.toLowerCase().endsWith(ext));
        }

        const validExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
        const hasValidProtocol = cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://');
        
        console.log('URL validation:', {
            url: cleanUrl,
            hasValidProtocol,
            hasValidExtension: validExtensions.test(cleanUrl)
        });

        return hasValidProtocol && validExtensions.test(cleanUrl);
    } catch (error) {
        console.error('Validation error:', error);
        return false;
    }
};