'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import useGlobalStore from '@/store/store'
import PageEditingWindows from '@/components/PageEditingWindows/PageEditingWindows'
import WrapperUserInputModal from '../WrapperUserInputModal/WrapperUserInputModal'
import './EditingWindow.scss'

function EditingWindow() {
  const { openEditingWindow, client, setOpenEditingWindow, admin } = useGlobalStore();
  console.log('admin', admin)
  // console.log('client', client)

  const methods = useForm()
  const { register, handleSubmit, formState: { errors }, setValue, clearErrors, control } = methods
  useEffect(() => {
    console.log('client', client)
    if (!client) return
    const getContract = async () => {
    const contractId = '5n8oZZkMKyBXvCqJ3sxzR8mjTZQhB3D9Hk6XKxX16dLu'
    try {
      const contract = await client.platform.contracts.get(contractId)
      console.log('contract', contract)
      console.log('Contract is registered:', contract.toJSON());

    } catch (error) {
      console.error('Error getting contract:', error)
      }
    }
    getContract()

    async function checkIdentity(client, identityId) {
      try {
        const identity = await client.platform.identities.get('2MfmHqYmAk1jAQNv7SsGJPT22MrfKFcHKZDc7cTu2biX');
        if (identity) {
          console.log('Identity found:', identity.toJSON());
        } else {
          console.error('Identity not found');
        }
      } catch (error) {
        console.error('Error fetching identity:', error);
      }
    }
    checkIdentity(client, admin)
  }, [client, admin])
  const onSubmit = async (data) => {
    console.log(data)

    try {
      // const identityId = '2MfmHqYmAk1jAQNv7SsGJPT22MrfKFcHKZDc7cTu2biX';
      // const identity = await client.platform.identities.get(identityId);
      // console.log('identity', identity)
      // console.log('identityId', identityId)
      // console.log('admin', admin)

      // const contractIdBuffer = Buffer.from(contractId, 'hex');
      const documentData = {
        name: data.name_ProjectEditingWindow,
        description: data.description_ProjectEditingWindow,
        url: data.url_ProjectEditingWindow,
        image: data.projectEditingWindow__ImageCard__Image,
        $createdAt: new Date().getTime(),
        $updatedAt: new Date().getTime()
      }
      const contractId = "5n8oZZkMKyBXvCqJ3sxzR8mjTZQhB3D9Hk6XKxX16dLu"
      const documentType = 'Project';
      const helloWorldDocument = await client.platform.documents.create(
        `${contractId}.${documentType}`,
        admin,
        documentData
      )

      console.log('Document created:', helloWorldDocument);
    } catch (error) {
      console.error('Error creating document:', error);
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
