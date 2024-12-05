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
            className={'WalletSelection' + (identityIds?.length > 1 ? ' WalletSelection__Open' : '')}
            onClick={() => identityIds?.length > 1 ? setOpenWalletSelection(true) : null}
        >
            <p>{identityIdentifier}</p>
            { identityIds?.length > 1 && <SvgIcons type={'arrowSelection'} /> }
            <animated.div className={'WalletSelection__Dropdown'} style={animation}>
                {identityIds?.map((id, index) => (
                    <p key={index}>{id}</p>
                ))}
            </animated.div>
        </button>
    )
}
