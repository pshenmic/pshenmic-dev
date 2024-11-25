'use client'

import './RegistrationForm.scss'
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react'
import { showToast } from '@/lib/showToast'

// type:
// data: { description: string, inputDescription: string, placeholder: string, buttonText: string }
export default function RegistrationForm({ data, handleFunction }) {
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (value) => {
        const words = value.trim().split(/\s+/)

        if (words.length <= 12) {
            setInputValue(value)
           
        } else {
            showToast('warn', '12 words max!');
        }
    };

    const animation = useSpring({
        transform: inputValue ? 'translate(0%, 20%)' : 'translate(-50%, 20%)',
        opacity: inputValue ? 0 : 1,
        config: {
            tension: 200,
            friction: 30
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        handleFunction(inputValue)
    }

    return (
        <form className={'RegistrationForm'} onSubmit={handleSubmit}>
            {data?.description && <div className={'RegistrationForm__Description'}>
                <p>{data.description}</p>
            </div>}
            <div className={'RegistrationForm__InputWrapper'}>
                <animated.p style={animation} className={'RegistrationForm__InputWrapper__Arrow'}>{'>'}</animated.p>
                {data?.inputDescription && <p className={'RegistrationForm__InputWrapper__InputDescription'}>{data.inputDescription}</p>}
                <input
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
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