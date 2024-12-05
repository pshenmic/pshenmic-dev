export default function SvgIcons({ type }) {
    const renderIcon = () => {
        switch (type) {
            case 'arrowSelection':
                return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
                </svg>
            case 'logOut':
                return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="2" height="11" fill="#currentColor" />
                    <path d="M8.5 11V9.8H9.75V8.6H11V7.4H9.75V6.2H8.5V5L9.75 5L11 5V6.2H12.25V7.4H13.5V8.6H12.25V9.8H11V11H9.75H8.5Z" fill="#currentColor" />
                    <path d="M4.5 8.59844V7.39844H9.75H11V8.59844H9.75H4.5Z" fill="#currentColor" />
                    <rect y="11" width="2" height="5" fill="#currentColor" />
                    <rect x="2" width="14" height="2" fill="#currentColor" />
                    <rect x="14" width="2" height="5" fill="#currentColor" />
                    <rect x="14" y="11" width="2" height="5" fill="#currentColor" />
                    <rect x="2" y="14" width="14" height="2" fill="#currentColor" />
                </svg>;
            default:
                return null;
        }
    };

    return (
        <>
            {renderIcon()}
        </>
    )
}