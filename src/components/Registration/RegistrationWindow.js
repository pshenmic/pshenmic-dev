import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
import './RegistrationWindow.scss'

export default function RegistrationWindow () {
  return (
    <div className={'RegistrationWindow'}>
        <p className={'RegistrationWindow__Title'}>Import to your Dash Wallet</p>
        <div className={'RegistrationWindow__Buttons'}>
            <RegistrationButton text={'SEED PHRASE'} style={{ background: '#0275ff' }} />
            <RegistrationButton text={'PRIVATE KEY'}/>
        </div>
    </div>
  )
}
