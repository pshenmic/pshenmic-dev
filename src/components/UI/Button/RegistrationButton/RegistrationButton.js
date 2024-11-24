import './RegistrationButton.scss'

export default function RegistrationButton({ text, handleClick, ariaLabel, ...props }) {
    return (
        <button
            className={'RegistrationButton'}
            onClick={handleClick}
            aria-label={ariaLabel}
            {...props}
        >
            <span>{text}</span>
        </button>
    )
}
