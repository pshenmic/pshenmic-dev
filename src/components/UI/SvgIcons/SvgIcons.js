export default function SvgIcons({ type }) {
    const renderIcon = () => {
        switch (type) {
            case 'arrowSelection':
                return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
                </svg>
            case 'logOut':
                return <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="36" fill="#2E3845" />
                    <rect x="10" y="10" width="2" height="11" fill="currentColor" />
                    <path d="M18.5 21V19.8H19.75V18.6H21V17.4H19.75V16.2H18.5V15L19.75 15L21 15V16.2H22.25V17.4H23.5V18.6H22.25V19.8H21V21H19.75H18.5Z" fill="currentColor" />
                    <path d="M14.5 18.5984V17.3984H19.75H21V18.5984H19.75H14.5Z" fill="currentColor" />
                    <rect x="10" y="21" width="2" height="5" fill="currentColor" />
                    <rect x="12" y="10" width="14" height="2" fill="currentColor" />
                    <rect x="24" y="10" width="2" height="5" fill="currentColor" />
                    <rect x="24" y="21" width="2" height="5" fill="currentColor" />
                    <rect x="12" y="24" width="14" height="2" fill="currentColor" />
                </svg>
            case 'comments':
                return <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 1.32V7.27979H0.810235V9H3V7H8.49023V6H10V1.32H8.49023V0H1.32V1.32H0Z" fill="currentColor" />
                </svg>
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