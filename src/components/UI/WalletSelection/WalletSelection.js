'use client'

import './WalletSelection.scss'
import { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'

export default function WalletSelection({ identityIds, identityIdentifier }) {
    const [openWalletSelection, setOpenWalletSelection] = useState(false)

    const animation = useSpring({
        opacity: openWalletSelection ? 0 : 1,
        config: {
            tension: 200,
            friction: 30
        }
    });

    return (
        <button
            className={ 'WalletSelection' + (identityIds?.length > 1 ? ' WalletSelection__Open' : '') }
            onClick={ () => identityIds?.length > 1 ? setOpenWalletSelection(true) : null }
        >
            <p>{identityIdentifier}</p>
            { identityIds?.length > 1 &&
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
                </svg> }
            <animated.div className={'WalletSelection__Dropdown'} style={animation}>
                { identityIds?.map( (id, index) => (
                    <p key={index}>{id}</p>
                )) }
            </animated.div>
        </button>
    )
}
