'use client'

import './RegistrationWindow.scss'
import Link from 'next/link'
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
import useGlobalStore from '@/store/store';
import { useEffect, useState } from 'react';
import { easings, useTransition, animated } from '@react-spring/web';

export default function RegistrationWindow() {
    const { client } = useGlobalStore();
    const [data, setData] = useState(null)

    useEffect(() => {
        if (!client) {
            setData(<LogInWindow />)
        }

        else if (client.identityIds) {
            setData(<UserWindow data={client}/>)
        } else if (true) {
            setData(<AdminWindow />)
        }
    }, [client])

    const transitions = useTransition(data, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 400, easing: easings.easeInOut },
        trail: 100,
        exitBeforeEnter: true,
    })

    return (
        <div className={'RegistrationWindow'}>
            {transitions((style, item) =>
                <animated.div style={{ ...style }}>
                    {item}
                </animated.div>
            )}
        </div>
    )
}

function LogInWindow() {
    const { setOpenImportWalletWindow } = useGlobalStore();

    return (
        <div className={'RegistrationWindow__Container'}>
            <p className={'RegistrationWindow__Title'}>Import to your Dash Wallet</p>
            <div className={'RegistrationWindow__Buttons'}>
                <RegistrationButton
                    text={'SEED PHRASE'}
                    onClick={() => setOpenImportWalletWindow(true)}
                    style={{ background: '#0275ff' }}
                />
                <RegistrationButton
                    text={'PRIVATE KEY'}
                    disabled={true}
                />
            </div>
            <div className={'RegistrationWindow__CallToAction'}>
                <p>Not using Dash yet?</p>
                <Link href={'/'}>Generate a new wallet here</Link>
            </div>
        </div>
    )
}

function UserWindow( {data} ) {
    return (
        <div className={'RegistrationWindow__Container'}>
            <p className={'RegistrationWindow__Title'}>{data?.name}</p>
            
        </div>
    )
}

function AdminWindow() {
    return (
        <div className={'RegistrationWindow__Container'}>
            <p className={'RegistrationWindow__Title'}>Import to your Dash Wallet</p>
        </div>
    )
}