'use client'

import './WalletSelection.scss'
import { useCallback, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import SvgIcons from '../SvgIcons/SvgIcons'
import useGlobalStore from '@/store/store'

export default function WalletSelection({ identityIds, identityIdentifier }) {
    const [openWalletSelection, setOpenWalletSelection] = useState(false)
    const { setIndexWallet } = useGlobalStore();

    const animation = useSpring({
        opacity: openWalletSelection ? 1 : 0,
        config: {
            tension: 200,
            friction: 30
        }
    });

    const handleClick = useCallback(async (index) => {
        setOpenWalletSelection(false)
        setIndexWallet(index)
    }, [setOpenWalletSelection, setIndexWallet])

    return (
        <button
            className={'WalletSelection' + (identityIds?.length > 1 ? ' WalletSelection__Open' : '')}
            onClick={() => identityIds?.length > 1 ? setOpenWalletSelection(!openWalletSelection) : null}
        >
            <p className={'WalletSelection__Text'}>{identityIdentifier}</p>
            {identityIds?.length > 1 && <SvgIcons type={'arrowSelection'} />}
            <animated.div className={'WalletSelection__Dropdown'} style={animation}>
                {identityIds?.map((id, index) => (
                    <span
                        className={'WalletSelection__Text'}
                        style={id.identityIdentifier === identityIdentifier ? { color: '#5199fc' } : null}
                        key={index}
                        onClick={() => { id.identityIdentifier === identityIdentifier ? null : handleClick(index) }}
                    >
                        {id.identityIdentifier}
                    </span>
                ))}
            </animated.div>
        </button>
    )
}
