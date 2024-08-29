import './ActionButtons.scss'

// type: dangerous || ordinary
function ActionButtons ({ typeButton = 'ordinary', text, handleClick, ariaLabel, type = 'button', ...props}) {
    return (
        <button 
            aria-label={ariaLabel}
            className={`Button ${typeButton === 'dangerous' ? 'ButtonDangerous' : 'ButtonOrdinary'}`}
            {...props}
            onClick={handleClick}
            type={type}
        >
            <span>{text}</span>
        </button>
    )
}

export default ActionButtons