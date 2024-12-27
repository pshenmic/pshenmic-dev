'use client'

import { useForm } from 'react-hook-form'
import useGlobalStore from '@/store/store'
import DarkWrapper from '../UI/DarkWrapper/DarkWrapper'
import TextField from '../UI/TextField/TextField'
import Image from 'next/image'
import ActionButtons from '../UI/Button/ActionButtons/ActionButtons'
import './HasAdminAccess.scss'

function HasAdminAccess () {
  const openAdminAccessPopup = useGlobalStore(state => state.openAdminAccessPopup)
  const setOpenAdminAccessPopup = useGlobalStore(state => state.setOpenAdminAccessPopup)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = (data) => {
    if (data.password && process.env.NEXT_PUBLIC_PASSWORD_ADMIN && data.password.toLowerCase() === process.env.NEXT_PUBLIC_PASSWORD_ADMIN.toLowerCase()) {
      const now = new Date()
      localStorage.setItem('isAdminPshenmic', 'true')
      localStorage.setItem('dataClear', `${now.getTime() + 86400000}`)
      setOpenAdminAccessPopup(false)
    }
    reset()
  }

  return (
    <DarkWrapper open={openAdminAccessPopup} duration={0}>
      <Image className={'AdminAccessBackground'} src={'/assets/img/bg.png'} width={1920} height={1080} alt={''}/>
      <form className={'AdminAccess'} onSubmit={handleSubmit(onSubmit)}>
        <p>pshenmic.admin</p>
        <div className={'AdminAccess__WrapperInput'}>
          {/* <TextField
            register={register}
            name={'password'}
            error={errors}
            text={'Private Key'}
            type={'password'}
          /> */}
          <ActionButtons text={'Send'} ariaLabel={'send'}/>
        </div>
      </form>
    </DarkWrapper>
  )
}

export default HasAdminAccess
