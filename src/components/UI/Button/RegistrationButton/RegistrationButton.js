import './RegistrationButton.scss'

export default function RegistrationButton({ text, handleClick, ariaLabel, className, disabled, ...props }) {
    return (
        <button
            className={`RegistrationButton ${disabled ? 'disabled' : ''} ${className}`}
            onClick={handleClick}
            aria-label={ariaLabel}
            disabled={disabled}
            {...props}
        >
            <span>{text}</span>
        </button>
    )
}
