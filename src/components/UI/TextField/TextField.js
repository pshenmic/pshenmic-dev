'use client'

import { memo, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useFormContext, useWatch } from 'react-hook-form';
import './TextField.scss'

function TextField({ placeholder, name, required = true, valid, text, arrow = false }) {
  const { hasOwnProperty } = Object.prototype
  const textareaRef = useRef(null)
  const { control, register, formState: { errors } } = useFormContext();
  const inputValue = control ? useWatch({ control, name }) : '';
  console.log(errors)
  const animation = useSpring({
    transform: inputValue ? 'translate(0%, 20%)' : 'translate(-50%, 20%)',
    opacity: inputValue ? 0 : 1,
    config: {
      tension: 200,
      friction: 30
    }
  });

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.minHeight = `auto`
      textareaRef.current.style.minHeight = `${textareaRef.current.scrollHeight}px`
    }
  }, [inputValue]);

  return (
    <div className={`TextField ${hasOwnProperty.call( errors || {}, name) ? 'TextFieldError' : ''}`}>
      {arrow && <animated.p style={animation} className={'TextField__Arrow'}>{'>'}</animated.p>}
      {text &&
        <div className={'TextField__InputDescriptionWrapper'}>
          <p className={'TextField__InputDescription'}>{text}</p>
          {required && <p className={'TextField__Optional'}>OPTIONAL</p>}
        </div>
      }
      <textarea
        ref={textareaRef}
        {...register(name, {
          required, pattern: {
            value: valid || ''
          }
        })}
        placeholder={placeholder || ''}
      />
    </div>

  )
}

export default memo(TextField)