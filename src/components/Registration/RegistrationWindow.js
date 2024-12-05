'use client'

import Link from 'next/link'
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
import useGlobalStore from '@/store/store';
import './RegistrationWindow.scss'

export default function RegistrationWindow() {
    const { setOpenImportWalletWindow } = useGlobalStore();
    const { client } = useGlobalStore();

    

    return (
        <div className={'RegistrationWindow'}>
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
        </div>
    )
}

function LogInWindow() {
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

function UserWindow() {
    return (
        <div className={'RegistrationWindow__Container'}>
            <p className={'RegistrationWindow__Title'}>Import to your Dash Wallet</p>
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