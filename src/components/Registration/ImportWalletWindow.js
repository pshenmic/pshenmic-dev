'use client'

import './ImportWalletWindow.scss'
import { useCallback, useEffect, useState } from "react";
import { useSpring, animated, useTransition, easings } from "@react-spring/web";
import { showToast } from '@/lib/showToast';
import { validateMnemonic } from 'bip39';
import { useDash } from '@/hooks/useDashClient';
import useGlobalStore from "@/store/store";
import DarkWrapper from "../UI/DarkWrapper/DarkWrapper";
import Image from "next/image";
import RegistrationForm from "./RegistrationForm";
import Loading from '../UI/Loading/Loading';
import localforage from 'localforage';

const dataSeedPhrase = {
    description: 'Make sure your device is safe & no one is watching, don\'t show this info to anyone.',
    inputDescription: 'Enter your 12 word Seed Phrase you want to import',
    placeholder: 'eg. white purple lucky...',
    buttonText: 'LOG IN'
}

const dataPrivateKey = {
    description: 'Make sure your device is safe & no one is watching, don\'t show this info to anyone.',
    inputDescription: 'Please enter your Private Key',
    placeholder: 'HEX / WIF / Base64...',
    buttonText: 'LOG IN'
}

export default function ImportWalletWindow() {
    const { openImportWalletWindow, setOpenImportWalletWindow, setLoadingGetUser, loadingGetUser, userDash, setUserDash } = useGlobalStore();
    const [activeButton, setActiveButton] = useState('seedPhrase');
    const [form, setForm] = useState(<p>Off course</p>)
    const { connect } = useDash();

    const errorCallback = () => {
        showToast('error', 'Error retrieving account');
        setLoadingGetUser(false);
        setOpenImportWalletWindow(true);
    };

    const successCallback = () => {
        showToast('success', 'Wallet imported successfully');
        setLoadingGetUser(false);
    };

    const getNewClient = useCallback(async (mnemonic) => {
        if (typeof window === 'undefined') return;
        const mnemonicTrim = mnemonic.trim();
        setLoadingGetUser(true);

        const walletStore = localforage.createInstance({
            name: 'dash-wallet',
            storeName: 'wallet_store',
            driver: [
                localforage.INDEXEDDB,
                localforage.WEBSQL,
                localforage.LOCALSTORAGE
            ]
        });
        try {
            if (!validateMnemonic(mnemonicTrim)) {
                showToast('error', 'Invalid mnemonic phrase.');
                setUserDash(null);
                setLoadingGetUser(false);
                return;
            }
            setOpenImportWalletWindow(false);
            connect({
                network: 'testnet',
                wallet: {
                    mnemonic: mnemonicTrim,
                    adapter: walletStore,
                    unsafeOptions: {
                        skipSynchronizationBeforeHeight: 1029000,
                    },
                }
            }).then(async (resolveClient) => {
                if (resolveClient?.identitiesData) {
                    setUserDash(resolveClient.identitiesData);
                    successCallback()
                }
            }).catch((error) => {
                errorCallback()
            })
        } catch (error) {
            console.error('Error:', error);
            showToast('error', 'Client creation failed');
            setLoadingGetUser(false);
            setOpenImportWalletWindow(true);
        }

    }, [setLoadingGetUser, setOpenImportWalletWindow, setUserDash, errorCallback, successCallback]);

    const animation = useSpring({
        transform: openImportWalletWindow ? 'translateX(0%)' : 'translateX(100%)',
        config: {
            tension: 200,
            friction: 30
        }
    });

    const animationLoading = useSpring({
        opacity: loadingGetUser ? 1 : 0,
        pointerEvents: loadingGetUser ? 'auto' : 'none',
        config: {
            tension: 200,
            friction: 30
        }
    });

    useEffect(() => {
        if (activeButton === 'seedPhrase') {
            setForm(<RegistrationForm data={dataSeedPhrase} handleFunction={getNewClient} type={'seedPhrase'} />)
        } else if (activeButton === 'privateKey') {
            setForm(<RegistrationForm data={dataPrivateKey} handleFunction={getNewClient} type={'privateKey'} />)
        } else {
            setForm(<p>Off course</p>)
        }
    }, [activeButton])

    const transitions = useTransition(form, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 400, easing: easings.easeInOut },
        trail: 100,
        exitBeforeEnter: true,
    })

    return (
        <DarkWrapper open={openImportWalletWindow} handleClick={() => setOpenImportWalletWindow(false)} >
            <animated.div style={animation} className={'ImportWalletWindow'} onClick={(e) => e.stopPropagation()}>
                <animated.div style={animationLoading} className={'ImportWalletWindow__ContainerLoading'}>
                    <div className={'ImportWalletWindow__ContainerLoading__Loading'}>
                        <Loading />
                    </div>
                    <p>It usually takes up to 3 minutes to connect to the blockchain. You can continue using the platform, and we will notify you once the process is successful or if it fails.</p>
                </animated.div>
                <button
                    className={"ImportWalletWindow__CloseButton"}
                    onClick={() => setOpenImportWalletWindow(false)}
                    aria-label={"Close Import Wallet Window"}
                >
                    <Image className={'ImportWalletWindow__CloseButton__Icon'} src={'/assets/img/close.svg'} alt={"close"} width={16} height={16} />
                </button>
                <div className={"ImportWalletWindow__Wrapper"}>
                    <h2 className={"ImportWalletWindow__Title"}>IMPORT WALLET</h2>
                    <div className={`ImportWalletWindow__ButtonsContent ${activeButton === 'seedPhrase' ? 'ImportWalletWindow__ButtonsContentSeedPhrase' : ''}`}>
                        <button
                            onClick={() => setActiveButton('seedPhrase')}
                            className={`ImportWalletWindow__ButtonsContent__Button ${activeButton === 'seedPhrase' ? 'Active' : ''}`}
                        >
                            SEED PHRASE
                        </button>
                        <button
                            disabled={true}
                            style={{ cursor: 'not-allowed' }}
                            onClick={() => setActiveButton('privateKey')}
                            className={`ImportWalletWindow__ButtonsContent__Button ${activeButton === 'privateKey' ? 'Active' : ''}`}
                        >
                            PRIVATE KEY
                        </button>
                    </div>
                    {transitions((style, item) =>
                        <animated.div style={{ ...style }}>
                            {item}
                        </animated.div>
                    )}
                </div>
            </animated.div>
        </DarkWrapper>
    )
}