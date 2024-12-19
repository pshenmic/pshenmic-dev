'use client'

import './RegistrationWindow.scss'
import Loading from '../UI/Loading/Loading';
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
import useGlobalStore from '@/store/store';
import WalletSelection from '../UI/WalletSelection/WalletSelection';
import SvgIcons from '../UI/SvgIcons/SvgIcons';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { easings, useTransition, animated } from '@react-spring/web';
import { useDash } from '@/hooks/useDashClient';

export default function RegistrationWindow() {
    const { userDash, setUserDash, setOpenImportWalletWindow, indexWallet } = useGlobalStore();
    const { disconnect } = useDash();

    const [data, setData] = useState(null)
    const statusTextRef = useRef(null)
    const statusStyleRef = useRef({})

    const handleLogout = useCallback(async () => {
        setUserDash(null);
        disconnect()
    }, [disconnect]);

    useEffect(() => {
        if (!userDash) {
            setData(<LogInWindow setOpenImportWalletWindow={setOpenImportWalletWindow} />);
            statusTextRef.current.innerText = 'LOG IN';
            statusStyleRef.current = { backgroundColor: '#2e3845' };
        } else {
            const listAdmin = process.env.NEXT_PUBLIC_LIST_ADMIN;
            const listAdminArray = listAdmin.split(',');
            if (listAdminArray.includes(userDash?.[indexWallet]?.identifier)) {
                setData(<AdminWindow
                    data={userDash?.[indexWallet]}
                    identities={userDash}
                    handleLogout={() => handleLogout()}
                />);
                statusTextRef.current.innerText = 'ADMIN';
                statusStyleRef.current = { backgroundColor: '#8bcc49' };
            } else if (userDash?.[indexWallet]?.identifier) {
                setData(<UserWindow
                    data={userDash?.[indexWallet]}
                    identities={userDash}
                    handleLogout={() => handleLogout()}
                />);
                statusTextRef.current.innerText = 'USER';
                statusStyleRef.current = { backgroundColor: '#0275ff' };
            }
        }
    }, [userDash, indexWallet, setUserDash, handleLogout]);

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

function LogInWindow({ setOpenImportWalletWindow }) {
    const { loadingGetUser } = useGlobalStore();
    const { totalProgress } = useDash();

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
                    <div className={'RegistrationWindow__Buttons'}>
                        <div className={'RegistrationWindow__Loading'}>
                            <Loading style={{ border: '1.5px solid #0275ff', borderTop: '1.5px solid transparent' }} />
                        </div>
                        <p className={'RegistrationWindow__Connecting'}>
                            <span className={'RegistrationWindow__Connecting__Progress'}>{totalProgress}%</span> loaded
                        </p>
                    </div>
                    : null}
            </div>
            {/* <div className={'RegistrationWindow__CallToAction'}>
                <p>Not using Dash yet?</p>
                <Link href={'/'}>Generate a new wallet here</Link>
            </div> */}
        </div>
    )
}

function UserWindow({ data, identities, handleLogout }) {
    const name = useMemo(() => {
        if (data?.name === data?.identifier) {
            const firstPart = data?.name.slice(0, 5);
            const lastPart = data?.name.slice(-5);
            return `${firstPart}...${lastPart}`;
        } else {
            return data?.name;
        }
    }, [data?.identifier, data?.name]);

    return (
        <div className={'RegistrationWindow__ContainerUser'}>
            <div className={'RegistrationWindow__InfoUser'}>
                <p className={'RegistrationWindow__Title'}>{name}</p>
                <WalletSelection identityIds={identities} identityIdentifier={data?.identifier} />
            </div>
            <button className={'RegistrationWindow__LogOut'} onClick={() => handleLogout()}>
                <SvgIcons type={'logOut'} />
            </button>
        </div>
    )
}

function AdminWindow({ data, identities, handleLogout }) {
    return (
        <div className={'RegistrationWindow__ContainerUser'}>
            <div className={'RegistrationWindow__InfoUser'}>
                <p className={'RegistrationWindow__Title'}>{data?.name || data?.identifier}</p>
                <WalletSelection identityIds={identities} identityIdentifier={data?.identifier} />
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
            <button className={'RegistrationWindow__LogOut'} onClick={() => handleLogout()}>
                <SvgIcons type={'logOut'} />
            </button>
        </div>
    )
}