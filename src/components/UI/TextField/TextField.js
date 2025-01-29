'use client'

import { memo, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useFormContext, useWatch } from 'react-hook-form';
import './TextField.scss'

function TextField({ placeholder, name, required = true, valid, text, arrow = false }) {
  const { hasOwnProperty } = Object.prototype
  const { control, register, formState: { errors }, setValue } = useFormContext();
  const inputValue = control ? useWatch({ control, name }) : '';

  const animation = useSpring({
    transform: inputValue ? 'translate(0%, 20%)' : 'translate(-50%, 20%)',
    opacity: inputValue ? 0 : 1,
    config: {
      tension: 200,
      friction: 30
    }
  });

  const textareaStyles = {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const target = event.target;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;
      
      const newValue = value.substring(0, start) + '\n' + value.substring(end);
      
      setValue(name, newValue, { 
        shouldValidate: true,
        shouldDirty: true 
      });
      
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      }, 0);
    }
  };

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
        {...register(name, {
          required, pattern: {
            value: valid || ''
          }
        })}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || ''}
        style={textareaStyles}
      />
    </div>

  )
}

export default memo(TextField)