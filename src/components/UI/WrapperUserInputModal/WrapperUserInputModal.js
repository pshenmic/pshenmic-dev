'use client'

import { useSpring, animated } from '@react-spring/web';
import DarkWrapper from '../DarkWrapper/DarkWrapper';
import Image from 'next/image';
import './WrapperUserInputModal.scss'

export default function WrapperUserInputModal({ children, open, setOpen }) {
    const animation = useSpring({
        transform: open ? 'translateX(0%)' : 'translateX(100%)',
        config: {
            tension: 200,
            friction: 30
        }
    });
    return (
        <DarkWrapper open={open} handleClick={() => setOpen(false)} >
            <animated.div style={animation} className={'WalletWindow'} onClick={(e) => e.stopPropagation()}>
                <button
                    className={"WalletWindow__CloseButton"}
                    onClick={() => setOpen(false)}
                    aria-label={"Close Window"}
                >
                    <Image
                        className={'WalletWindow__CloseButton__Icon'}
                        src={'/assets/img/close.svg'}
                        alt={"close"}
                        width={16}
                        height={16}
                    />
                </button>
                {children}
            </animated.div>
        </DarkWrapper>
    )
}