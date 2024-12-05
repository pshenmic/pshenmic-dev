'use client'

import { useCallback, useEffect, useState } from "react";
import { useSpring, animated, useTransition, easings } from "@react-spring/web";
import useGlobalStore from "@/store/store";
import DarkWrapper from "../UI/DarkWrapper/DarkWrapper";
import Image from "next/image";
import RegistrationForm from "./RegistrationForm";
import Dash from "dash";
import { validateMnemonic } from 'bip39';
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
    const { openImportWalletWindow, setOpenImportWalletWindow, setClient, client } = useGlobalStore();
    const [activeButton, setActiveButton] = useState('seedPhrase');
    const [form, setForm] = useState(<p>Off course</p>)

    const getNewClient = useCallback(async (mnemonic) => {
        const mnemonicTrim = mnemonic.trim();
        if (validateMnemonic(mnemonicTrim)) {
            const client = new Dash.Client({
                network: 'testnet',
                wallet: {
                    mnemonic: mnemonicTrim,
                    unsafeOptions: {
                        skipSynchronizationBeforeHeight: 1000000,
                    },
                },
            });
            try{
                const account = await client.getWalletAccount();
                const identityIds = account.identities.getIdentityIds();

                if (identityIds.length > 0) {
                    const identity = await client.platform.identities.get(identityIds[0]);
                    console.log('identity', identity)
                    const identityIdentifier = identity.getId().toString();
                    console.log('identityIdentifier:', identityIdentifier);

                    const document = await client.platform.names.resolveByRecord('identity', identityIdentifier);
                    console.log('document', document)

                    if ( document.length > 0 ) {
                        let name
                        document.forEach(doc => {
                            console.log('doc.getData()', doc.getData())
                            const data = doc.getData()
                            data.records.identity === identityIdentifier ? 
                                data.label && data.parentDomainName ? name = `${data.label}.${data.parentDomainName}`
                                : name = data.records.identity
                            : name = null
                        })
                        
                        if ( name ) {
                            setClient({
                                name,
                                identityIdentifier,
                                identityIds
                            })
                            console.log('name', name)
                        }
                    }
                }
            } catch (error) {
                console.error('Error retrieving account:', error);
                setClient(null)
            }
        } else {
            console.error('Invalid mnemonic phrase.');
        }
    }, [setClient]);

    console.log('client', client)

    const animation = useSpring({
        transform: openImportWalletWindow ? 'translateX(0%)' : 'translateX(100%)',
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