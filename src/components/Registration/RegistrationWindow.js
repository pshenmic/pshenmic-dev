'use client'

import './RegistrationWindow.scss'
import Link from 'next/link'
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
import useGlobalStore from '@/store/store';
import WalletSelection from '../UI/WalletSelection/WalletSelection';
import SvgIcons from '../UI/SvgIcons/SvgIcons';
import { useEffect, useRef, useState } from 'react';
import { easings, useTransition, animated } from '@react-spring/web';
import { useLocalstorageState } from 'rooks';
import Loading from '../UI/Loading/Loading';

export default function RegistrationWindow() {
    const [client, setClient] = useLocalstorageState('userDash', '');
    const [data, setData] = useState(null)
    const statusTextRef = useRef(null)
    const statusStyleRef = useRef({})
    console.log(client)
    useEffect(() => {
        if (!client) {
            setData(<LogInWindow />);
            statusTextRef.current.innerText = 'LOG IN';
            statusStyleRef.current = { backgroundColor: '#2e3845' };
        } else {
            const listAdmin = process.env.NEXT_PUBLIC_LIST_ADMIN;
            const listAdminArray = listAdmin.split(',');
            if (listAdminArray.includes(client?.identityIdentifier)) {
                setData(<AdminWindow data={client} setClient={setClient} />);
                statusTextRef.current.innerText = 'ADMIN';
                statusStyleRef.current = { backgroundColor: '#8bcc49' };
            } else if (client.identityIds) {
                setData(<UserWindow data={client} setClient={setClient} />);
                statusTextRef.current.innerText = 'USER';
                statusStyleRef.current = { backgroundColor: '#0275ff' };
            }
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
            <div className={'RegistrationWindow__Status'} style={statusStyleRef.current}>
                <p ref={statusTextRef}></p>
            </div>
            {transitions((style, item) =>
                <animated.div style={{ ...style, width: '100%' }}>
                    {item}
                </animated.div>
            )}
        </div>
    )
}

function LogInWindow() {
    const { setOpenImportWalletWindow, loadingGetUser } = useGlobalStore();

    return (
        <div className={'RegistrationWindow__Container'}>
            <p className={'RegistrationWindow__Title'}>Import to your Dash Wallet</p>
            <div className={'RegistrationWindow__Buttons'}>
                <RegistrationButton
                    text={'SEED PHRASE'}
                    onClick={() => setOpenImportWalletWindow(true)}
                    style={{ background: '#0275ff' }}
                    disabled={loadingGetUser}
                />
                <RegistrationButton
                    text={'PRIVATE KEY'}
                    disabled={true}
                />
                {loadingGetUser ?
                    <>
                        <div className={'RegistrationWindow__Loading'}>
                            <Loading style={{ border: '1.5px solid #0275ff', borderTop: '1.5px solid transparent' }} />
                        </div>
                        <p className={'RegistrationWindow__Connecting'}>connecting...</p>
                    </>
                    : null}
            </div>
            <div className={'RegistrationWindow__CallToAction'}>
                <p>Not using Dash yet?</p>
                <Link href={'/'}>Generate a new wallet here</Link>
            </div>
        </div>
    )
}

function UserWindow({ data, setClient }) {
    return (
        <div className={'RegistrationWindow__ContainerUser'}>
            <div className={'RegistrationWindow__InfoUser'}>
                <p className={'RegistrationWindow__Title'}>{data?.name}</p>
                <WalletSelection identityIds={data?.identityIds} identityIdentifier={data?.identityIdentifier} />
            </div>
            <button className={'RegistrationWindow__LogOut'} onClick={() => setClient(null)}>
                <SvgIcons type={'logOut'} />
            </button>
        </div>
    )
}

function AdminWindow({ data, setClient }) {
    return (
        <div className={'RegistrationWindow__ContainerUser'}>
            <div className={'RegistrationWindow__InfoUser'}>
                <p className={'RegistrationWindow__Title'}>{data?.name}</p>
                <WalletSelection identityIds={data?.identityIds} identityIdentifier={data?.identityIdentifier} />
                <div className={'RegistrationWindow__Buttons'}>
                    <RegistrationButton
                        text={'NEW TASK'}
                        disabled={true}
                        style={{ background: '#0275ff' }}
                    />
                    <RegistrationButton
                        text={'NEW PROJECT'}
                        disabled={true}
                    />
                    <RegistrationButton
                        text={'12 CLAIMS'}
                        disabled={true}
                        style={{ background: '#ffbd07' }}
                    />
                </div>
            </div>
            <button className={'RegistrationWindow__LogOut'} onClick={() => setClient(null)}>
                <SvgIcons type={'logOut'} />
            </button>
        </div>
    )
}