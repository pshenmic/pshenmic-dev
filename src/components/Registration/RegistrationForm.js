'use client'

import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react'
import './RegistrationForm.scss'

// type:
// data: { description: string, inputDescription: string, placeholder: string, buttonText: string }
export default function RegistrationForm({ data }) {
    const [inputValue, setInputValue] = useState('')

    const animation = useSpring({
        transform: inputValue ? 'translate(0%, 20%)' : 'translate(-50%, 20%)',
        opacity: inputValue ? 0 : 1,
        config: {
            tension: 200,
            friction: 30
        }
    });

    return (
        <form className={'RegistrationForm'}>
            {data?.description && <div className={'RegistrationForm__Description'}>
                <p>{data.description}</p>
            </div>}
            <div className={'RegistrationForm__InputWrapper'}>
                <animated.p style={animation} className={'RegistrationForm__InputWrapper__Arrow'}>{'>'}</animated.p>
                {data?.inputDescription && <p className={'RegistrationForm__InputWrapper__InputDescription'}>{data.inputDescription}</p>}
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    type={"text"}
                    placeholder={data?.placeholder || ''}
                    required
                />
            </div>
            <RegistrationButton
                disabled={!inputValue}
                text={data?.buttonText || 'Submit'}
                type={"submit"}
                ariaLabel={"Submit form"}
                className={'RegistrationForm__Button'}
            />
        </form>
    )
}