'use client'

import { useSpring, animated } from '@react-spring/web';
import DarkWrapper from '../DarkWrapper/DarkWrapper';
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
                {children}
            </animated.div>
        </DarkWrapper>
    )
}