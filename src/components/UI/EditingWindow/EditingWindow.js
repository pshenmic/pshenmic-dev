'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { showToast } from '@/lib/showToast'
import useGlobalStore from '@/store/store'
import PageEditingWindows from '@/components/PageEditingWindows/PageEditingWindows'
import WrapperUserInputModal from '../WrapperUserInputModal/WrapperUserInputModal'
import './EditingWindow.scss'

function EditingWindow() {
  const { openEditingWindow, client, setOpenEditingWindow, nameAdmin, admin, projectDataEditing, setProjectDataEditing, setDocuments, documents } = useGlobalStore();
  const isSubmittingRef = useRef(false);

  const methods = useForm()
  const { register, handleSubmit, formState: { errors }, setValue, clearErrors, control, reset } = methods

  useEffect(() => {
    methods.reset({
      name_ProjectEditingWindow: projectDataEditing?.name_ProjectEditingWindow || '',
      description_ProjectEditingWindow: projectDataEditing?.description_ProjectEditingWindow || '',
      url_ProjectEditingWindow: projectDataEditing?.url_ProjectEditingWindow || '',
      image_ProjectEditingWindow: projectDataEditing?.image_ProjectEditingWindow || '',
    });
  }, [projectDataEditing]);

  const onSubmit = async (data) => {
    if (isSubmittingRef.current) return;

    try {
      isSubmittingRef.current = true;

      const dataProject = {
        name: data.name_ProjectEditingWindow,
        description: data.description_ProjectEditingWindow,
        url: data.url_ProjectEditingWindow,
        image: data.image_ProjectEditingWindow,
      }

      if (!client || !client.platform) {
        showToast('error', 'Client not found');
        return;
      }

      if (projectDataEditing?.id) {
        const [existingDocument] = await client.platform.documents.get(
          `${process.env.NEXT_PUBLIC_CONTRACT_ID_PROJECTS}.Project`,
          { where: [['$id', '==', projectDataEditing.id]] }
        );

        if (existingDocument) {
          existingDocument.set('name', dataProject.name);
          existingDocument.set('description', dataProject.description);
          existingDocument.set('image', dataProject.image);
          existingDocument.set('url', dataProject.url);

          await client.platform.documents.broadcast({
            replace: [existingDocument],
          }, admin);

          const updatedDocuments = documents.map(doc =>
            doc.id === projectDataEditing.id
              ? {
                ...doc,
                ...dataProject
              }
              : doc
          );

          setDocuments(updatedDocuments);

          showToast('success', 'Document updated successfully');
        } else {
          showToast('error', 'Document not found');
        }
      } else {
        const document = await client.platform.documents.create(`${process.env.NEXT_PUBLIC_CONTRACT_ID_PROJECTS}.Project`, admin, dataProject);

        await client.platform.documents.broadcast({
          create: [document],
        }, admin).then(res => {
          const newDoc = {
            id: document.getId().toString(),
            name: dataProject.name,
            description: dataProject.description,
            url: dataProject.url,
            image: dataProject.image,
            $ownerId: document.getOwnerId().toString(),
            ownerName: nameAdmin
          };

          const newDocuments = [...documents, newDoc];
          setDocuments(newDocuments);
          showToast('success', 'Document created successfully');
          setOpenEditingWindow(false);
        })
      }
    } catch (error) {
      console.error('Error submitting document:', error);
      showToast('error', 'Error submitting document');
    } finally {
      isSubmittingRef.current = false;
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
      isSubmittingRef.current = false;
    }
  }, [openEditingWindow])

  return (
    <>
      {admin
        ?
        <FormProvider {...methods}>
          <WrapperUserInputModal open={openEditingWindow} setOpen={setOpenEditingWindow}>
            <form onKeyDown={handleKeyDown} onSubmit={handleSubmit(onSubmit)} style={{ height: '100vh' }}>
              <PageEditingWindows />
            </form>
          </WrapperUserInputModal>
        </FormProvider>
        : null}
    </>
  )
}

export default EditingWindow
