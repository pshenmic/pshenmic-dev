import './TextField.scss'

function TextField ({ error = {}, placeholder, name, register, required = true, valid, text, richText = false, type = 'text' }) {
  const { hasOwnProperty } = Object.prototype

  console.log('Error object:', error)
  console.log('Error for name:', hasOwnProperty.call(error, name))

  return (
    <div className={`TextField ${hasOwnProperty.call(error, name) ? 'TextFieldError' : ''}`}>
      {text ? <p>{text}{required && <span>*</span>}</p> : null}
      {richText
        ? <textarea
            {...register(name, { required })}
        />
        : <input
            {...register(name, {
              required,
              pattern: {
                value: valid || ''
              }
            })}
            placeholder={placeholder}
            autoComplete={'off'}
            autoCorrect={'off'}
            type={type}
        />}
    </div>
  )
}

export default TextField
