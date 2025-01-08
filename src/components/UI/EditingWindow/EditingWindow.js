'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import useGlobalStore from '@/store/store'
import PageEditingWindows from '@/components/PageEditingWindows/PageEditingWindows'
import WrapperUserInputModal from '../WrapperUserInputModal/WrapperUserInputModal'
import './EditingWindow.scss'
import { showToast } from '@/lib/showToast'

function EditingWindow() {
  const { openEditingWindow, client, setOpenEditingWindow, admin } = useGlobalStore();
  const methods = useForm()
  const { register, handleSubmit, formState: { errors }, setValue, clearErrors, control } = methods

  const onSubmit = async (data) => {
    try {
      const dataProject = {
        name: data.name_ProjectEditingWindow,
        description: data.description_ProjectEditingWindow,
        url: data.url_ProjectEditingWindow,
        image: data.projectEditingWindow__ImageCard__Image,
      }

      if (!client || !client.platform) {
        showToast('error', 'Client not found');
        return;
      }

      const document = await client.platform.documents.create(`${process.env.NEXT_PUBLIC_CONTRACT_ID_PROJECTS}.Project`, admin, dataProject);

      await client.platform.documents.broadcast({
        create: [document],
      }, admin).then(res => {
        showToast('success', 'Document created successfully');
        setOpenEditingWindow(false);
      })

    } catch (error) {
      console.error('Error submitting document:', error);
      showToast('error', 'Error submitting document');
    }
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
