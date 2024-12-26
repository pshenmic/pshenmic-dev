'use client'

import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import useGlobalStore from '@/store/store'
import DarkWrapper from '../DarkWrapper/DarkWrapper'
import ActionButtons from '../Button/ActionButtons/ActionButtons'
import Image from 'next/image'
import PageEditingWindows from '@/components/PageEditingWindows/PageEditingWindows'
import './EditingWindow.scss'
import WrapperUserInputModal from '../WrapperUserInputModal/WrapperUserInputModal'

function EditingWindow() {
  const openEditingWindow = useGlobalStore(state => state.openEditingWindow)
  const setOpenEditingWindow = useGlobalStore(state => state.setOpenEditingWindow)
  const admin = useGlobalStore(state => state.admin)
  const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  useEffect(() => {
    if (!openEditingWindow) {
      clearErrors()
    }
  }, [openEditingWindow])

  return (
    <>
      {admin
        ? <WrapperUserInputModal open={openEditingWindow} setOpen={setOpenEditingWindow}>
          <form onKeyDown={handleKeyDown} onSubmit={handleSubmit(onSubmit)}>
              <PageEditingWindows
                errors={errors}
                register={register}
                setValue={setValue}
                clearErrors={clearErrors}
              />
          </form>
        </WrapperUserInputModal>
        : null}
    </>
  )
}

export default EditingWindow
