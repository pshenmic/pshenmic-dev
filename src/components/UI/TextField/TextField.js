import './TextField.scss'

function TextField ({ error = {}, placeholder, name, register, required = true, valid, text, richText = false, type = 'text' }) {
    console.log('Error object:', error);
console.log('Error for name:', error.hasOwnProperty(name));
    return (
        <div className={`TextField ${error.hasOwnProperty(name) ? 'TextFieldError' : ''}`}>
            {text ? <p>{text}{required && <span>*</span>}</p> : null}
            { richText
                ? <textarea
                    {...register(name, {
                        required: required,
                    })}
                />
                : <input
                    {...register(name, {
                        required: required,
                        pattern: {
                            value: valid || '',
                        }
                    })}
                    placeholder={placeholder}
                    autoComplete={'off'}
                    autoCorrect={'off'}
                    type={type}
                /> }
        </div>
    )
}

export default TextField
