export function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '…'
    }
    return text;
}

export const formatOwnerId = (text) => {
    if (!text) return '';
    if (text.length <= 12) return text;
    return `${text.slice(0, 4)}…${text.slice(-4)}`;
};