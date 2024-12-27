'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import useGlobalStore from '@/store/store'
import PageEditingWindows from '@/components/PageEditingWindows/PageEditingWindows'
import WrapperUserInputModal from '../WrapperUserInputModal/WrapperUserInputModal'
import './EditingWindow.scss'

function EditingWindow() {
  const openEditingWindow = useGlobalStore(state => state.openEditingWindow)
  const setOpenEditingWindow = useGlobalStore(state => state.setOpenEditingWindow)
  const admin = useGlobalStore(state => state.admin)

  const methods = useForm()
  const { register, handleSubmit, formState: { errors }, setValue, clearErrors, control } = methods

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
        ?
      <FormProvider {...methods}>
          <WrapperUserInputModal open={openEditingWindow} setOpen={setOpenEditingWindow}>
            <form onKeyDown={handleKeyDown} onSubmit={handleSubmit(onSubmit)}>
              <PageEditingWindows />
            </form>
          </WrapperUserInputModal>
        </FormProvider>
        : null}
    </>
  )
}

export default EditingWindow
