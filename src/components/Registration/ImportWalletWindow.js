'use client'

import useGlobalStore from "@/store/store";
import { useSpring, animated } from "@react-spring/web";
import './ImportWalletWindow.scss'
import DarkWrapper from "../UI/DarkWrapper/DarkWrapper";

export default function ImportWalletWindow() {
    const { openImportWalletWindow, setOpenImportWalletWindow } = useGlobalStore();

    const animation = useSpring({
        transform: openImportWalletWindow ? 'translateX(0%)' : 'translateX(100%)',
        config: {
            tension: 200,
            friction: 30
        }
    });

    return (
        <DarkWrapper open={openImportWalletWindow} onClick={() => setOpenImportWalletWindow(false)}>
            <animated.div style={animation} className={'ImportWalletWindow'}>
                <p>Import Wallet</p>
            </animated.div>
        </DarkWrapper>
    )
}