'use client'

import useGlobalStore from "@/store/store";
import { useSpring, animated } from "@react-spring/web";
import './ImportWalletWindow.scss'
import DarkWrapper from "../UI/DarkWrapper/DarkWrapper";
import Image from "next/image";
import { useState } from "react";

export default function ImportWalletWindow() {
    const { openImportWalletWindow, setOpenImportWalletWindow } = useGlobalStore();
    const [activeButton, setActiveButton] = useState('seedPhrase');

    const animation = useSpring({
        transform: openImportWalletWindow ? 'translateX(0%)' : 'translateX(100%)',
        config: {
            tension: 200,
            friction: 30
        }
    });

    return (
        <DarkWrapper open={openImportWalletWindow} >
            <animated.div style={animation} className={'ImportWalletWindow'}>
                <button
                    className="ImportWalletWindow__CloseButton"
                    onClick={() => setOpenImportWalletWindow(false)}
                    aria-label={"Close Import Wallet Window"}
                >
                    <Image className={'ImportWalletWindow__CloseButton__Icon'} src={'/assets/img/close.svg'} alt={"close"} width={16} height={16} />
                </button>
                <h2 className="ImportWalletWindow__Title">IMPORT WALLET</h2>
                <div className={ `ImportWalletWindow__ButtonsContent ${activeButton === 'seedPhrase' ? 'ImportWalletWindow__ButtonsContentSeedPhrase' : ''}`}>
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
            </animated.div>
        </DarkWrapper>
    )
}