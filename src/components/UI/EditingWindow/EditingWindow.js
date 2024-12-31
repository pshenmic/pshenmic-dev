'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import useGlobalStore from '@/store/store'
import PageEditingWindows from '@/components/PageEditingWindows/PageEditingWindows'
import WrapperUserInputModal from '../WrapperUserInputModal/WrapperUserInputModal'
import './EditingWindow.scss'

function EditingWindow() {
  const { openEditingWindow, client, setOpenEditingWindow, admin } = useGlobalStore();
  // console.log('admin', admin)
  // console.log('client', client)

  const methods = useForm()
  const { register, handleSubmit, formState: { errors }, setValue, clearErrors, control } = methods

  const onSubmit = async (data) => {
    console.log(data)
    
    // try {
    //   const identityId = admin;
    //   const identity = await client.platform.identities.get(identityId);

    //   const documentData = data

    //   const helloWorldDocument = await client.platform.documents.create(
    //     'helloWorldContract.note',
    //     identity,
    //     documentData
    //   );

    //   console.log('Document created:', helloWorldDocument);
    // } catch (error) {
    //   console.error('Error creating document:', error);
    // }
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
