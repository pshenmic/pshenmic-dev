'use client'

import { useCallback, useEffect, useState } from "react";
import { useSpring, animated, useTransition, easings } from "@react-spring/web";
import useGlobalStore from "@/store/store";
import DarkWrapper from "../UI/DarkWrapper/DarkWrapper";
import Image from "next/image";
import RegistrationForm from "./RegistrationForm";
import Dash from 'dash';
import './ImportWalletWindow.scss'

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
    const { openImportWalletWindow, setOpenImportWalletWindow } = useGlobalStore();
    const [activeButton, setActiveButton] = useState('seedPhrase');
    const [form, setForm] = useState(<p>Off course</p>)
    const { setClient } = useGlobalStore();

    const getNewClient = useCallback((mnemonic) => {
        const client = new Dash.Client({
            network: "testnet",
            wallet: {
                mnemonic: mnemonic,
            },
        });
        console.log('client', client)
        return setClient(client)
    }, [setClient])

    const animation = useSpring({
        transform: openImportWalletWindow ? 'translateX(0%)' : 'translateX(100%)',
        config: {
            tension: 200,
            friction: 30
        }
    });

    useEffect(() => {
        if (activeButton === 'seedPhrase') {
            setForm(<RegistrationForm data={dataSeedPhrase} handleFunction={getNewClient}/>)
        } else if (activeButton === 'privateKey') {
            setForm(<RegistrationForm data={dataPrivateKey} />)
        } else {
            setForm(<p>Off course</p>)
        }
    }, [activeButton])

    const transitions = useTransition(form, {
        from: { opacity: 0, transform: 'translateX(-30%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(30%)' },
        config: { duration: 400, easing: easings.easeInBack },
        trail: 100,
        exitBeforeEnter: true,
    })

    return (
        <DarkWrapper open={openImportWalletWindow} >
            <animated.div style={animation} className={'ImportWalletWindow'}>
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