'use client'

import './RegistrationForm.scss'
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
import { useSpring, animated } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'
import { showToast } from '@/lib/showToast'

// type:
// data: { description: string, inputDescription: string, placeholder: string, buttonText: string }
// type: 'seedPhrase' | 'privateKey'
export default function RegistrationForm({ data, handleFunction, type }) {
    const [inputValue, setInputValue] = useState('')
    const textareaRef = useRef(null)

    const validationSeedPhrase = (value) => {
        const words = value.trim().split(/\s+/)
        if (words.length > 12) {
            showToast('warn', '12 words max!')
            return false
        }
        return true
    };

    const validationPrivateKey = (value) => {
        return true
    };

    const handleInputChange = (value) => {
        const validation = type === 'seedPhrase' ? validationSeedPhrase(value) : validationPrivateKey(value)
        if (validation) {
            setInputValue(value)
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

    useEffect(() => {
        if (textareaRef?.current) {
            textareaRef.current.style.minHeight = `auto`
            textareaRef.current.style.minHeight = `${textareaRef.current.scrollHeight}px`
        }
    }, [inputValue]);

    return (
        <form className={'RegistrationForm'} onSubmit={handleSubmit}>
            { data?.description && <div className={'RegistrationForm__Description'}>
                <p>{data.description}</p>
            </div> }
            <div className={'RegistrationForm__InputWrapper'}>
                <animated.p style={animation} className={'RegistrationForm__InputWrapper__Arrow'}>{'>'}</animated.p>
                {data?.inputDescription && <p className={'RegistrationForm__InputWrapper__InputDescription'}>{data.inputDescription}</p>}
                <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={data?.placeholder || ''}
                    required
                    style={inputValue.trim().split(/\s+/).length === 12 ? { borderBottom: '1px solid #0275ff' } : {}}
                />
            </div>
            <RegistrationButton
                disabled={type === 'seedPhrase' ? inputValue.trim().split(/\s+/).length !== 12 : true}
                text={data?.buttonText || 'Submit'}
                type={"submit"}
                ariaLabel={"Submit form"}
                className={'RegistrationForm__Button'}
            />
        </form>
    )
}