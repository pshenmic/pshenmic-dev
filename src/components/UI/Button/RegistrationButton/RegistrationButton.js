import './RegistrationButton.scss'

export default function RegistrationButton({ text, handleClick, ariaLabel, disabled, ...props }) {
    return (
        <button
            className={`RegistrationButton ${disabled ? 'disabled' : ''}`}
            onClick={handleClick}
            aria-label={ariaLabel}
            disabled={disabled}
            {...props}
        >
            <span>{text}</span>
        </button>
    )
}
