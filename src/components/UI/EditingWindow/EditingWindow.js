'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import useGlobalStore from '@/store/store'
import PageEditingWindows from '@/components/PageEditingWindows/PageEditingWindows'
import WrapperUserInputModal from '../WrapperUserInputModal/WrapperUserInputModal'
import './EditingWindow.scss'
import { showToast } from '@/lib/showToast'

function EditingWindow() {
  const { openEditingWindow, client, setOpenEditingWindow, admin, projectDataEditing, setProjectDataEditing } = useGlobalStore();

  const methods = useForm()
  const { register, handleSubmit, formState: { errors }, setValue, clearErrors, control, reset } = methods

  console.log(projectDataEditing)

  useEffect(() => {
    methods.reset({
        name_ProjectEditingWindow: projectDataEditing?.name_ProjectEditingWindow || '',
        description_ProjectEditingWindow: projectDataEditing?.description_ProjectEditingWindow || '',
        url_ProjectEditingWindow: projectDataEditing?.url_ProjectEditingWindow || '',
    });
}, [projectDataEditing]);

  const onSubmit = async (data) => {
    try {
      const dataProject = {
        name: data.name_ProjectEditingWindow,
        description: data.description_ProjectEditingWindow,
        url: data.url_ProjectEditingWindow,
      }

      if (!client || !client.platform) {
        showToast('error', 'Client not found');
        return;
      }

      if (projectDataEditing?.id) {
        // Получаем существующий документ
        const [existingDocument] = await client.platform.documents.get(
          `${process.env.NEXT_PUBLIC_CONTRACT_ID_PROJECTS}.Project`,
          { where: [['$id', '==', projectDataEditing.id]] }
        );

        console.log('existingDocument', existingDocument)

        if (existingDocument) {
          // Обновляем данные документа
          existingDocument.set('name', dataProject.name);
          existingDocument.set('description', dataProject.description);
          existingDocument.set('url', dataProject.url);
          // existingDocument.set('updatedAt', new Date().toUTCString());

          // Отправляем обновленный документ
          await client.platform.documents.broadcast({
            replace: [existingDocument],
          }, admin);

          showToast('success', 'Document updated successfully');
        } else {
          showToast('error', 'Document not found');
        }
      } else {
        const document = await client.platform.documents.create(`${process.env.NEXT_PUBLIC_CONTRACT_ID_PROJECTS}.Project`, admin, dataProject);

        await client.platform.documents.broadcast({
          create: [document],
        }, admin).then(res => {
          showToast('success', 'Document created successfully');
          setOpenEditingWindow(false);
        })
      }
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
      setProjectDataEditing({})
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
