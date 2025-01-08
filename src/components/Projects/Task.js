import Image from 'next/image'
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
import Grade from '../UI/Grade/Grade'
import './Task.scss'
import { motion as m } from 'framer-motion'

export default function Task() {
    return (
        <m.div
            className={"Task"}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55 }}
        >
            <p className={'ProjectListItem__PendingClaim'}>PENDING CLAIM</p>
            <p className={'ProjectListItem__Domain'}>PSHENMIC.DEV</p>
            <h3>TASK PAGE</h3>
            <div className={'Task__Content'}>
                <RegistrationButton text={'ASSIGNED'} disabled={true} className={'Task__Content__Button'} />
                <div className={'Task__Content__Creator'}>
                    <Image src={'/assets/img/dash-electrum-icon.png'} className={'Task__Content__Creator__Image'} alt={'Creator'} width={38} height={38} />
                    <p className={'Task__Content__Creator__Name'}>Black Mirror Designer</p>
                </div>
            </div>
            <p className={'Task__Description'}>Design a new page for the list of all tasks.</p>
            <RegistrationButton text={'OPEN TASK'} disabled={true} className={'Task__OpenTaskButton'} />
            <div className={'Task__FooterCard'}>
                <Grade />
                <RegistrationButton text={'CLAIM'} disabled={true} />
            </div>
        </m.div>
    )
}