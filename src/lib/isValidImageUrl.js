export const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') {
        console.log('Invalid input:', url);
        return false;
    }
    
    try {
        // Проверка для Data URL (base64)
        if (url.startsWith('data:image/')) {
            return true;
        }

        // Проверка для локальных путей
        if (url.startsWith('/')) {
            const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
            return validExtensions.some(ext => url.toLowerCase().endsWith(ext));
        }

        // Проверка для обычных URL
        const validExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
        const hasValidProtocol = url.startsWith('http://') || url.startsWith('https://');
        
        console.log('URL validation:', {
            url,
            hasValidProtocol,
            hasValidExtension: validExtensions.test(url)
        });

        return hasValidProtocol && validExtensions.test(url);
    } catch (error) {
        console.error('Validation error:', error);
        return false;
    }
};