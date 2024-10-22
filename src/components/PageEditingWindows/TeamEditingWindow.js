import { useCallback, useState } from 'react'
import ActionButtons from '../UI/Button/ActionButtons/ActionButtons'
import EditFieldWrapper from '../UI/EditFieldWrapper/EditFieldWrapper'
import FileInput from '../UI/FileInput/FileInput'
import TextField from '../UI/TextField/TextField'
import './PageEditingWindows.scss'

function TeamEditingWindow ({ errors, register, setValue, clearErrors }) {
  const [networks, setNetworks] = useState([])

  const addField = useCallback(() => {
    setNetworks([...networks, { id: Date.now() }])
  }, [networks])

  const removeField = useCallback((id) => {
    setNetworks(networks.filter(field => field.id !== id))
  }, [networks])

  return (
    <>
      <EditFieldWrapper title={'Hero'}>
        <FileInput
          text={'avatar'}
          error={errors}
          name={'avatar_TeamEditingWindow'}
          register={register}
          setValue={setValue}
          clearErrors={clearErrors}
        />
        <TextField
          text={'name'}
          error={errors}
          name={'name_TeamEditingWindow'}
          register={register}
        />
        <TextField
          text={'username'}
          error={errors}
          name={'username_TeamEditingWindow'}
          register={register}
        />
        <TextField
          text={'role'}
          error={errors}
          name={'role_TeamEditingWindow'}
          register={register}
        />
      </EditFieldWrapper>
      {networks.map((field, i) => (
        <EditFieldWrapper key={field.id} title={`Social network ${i + 1}`}>
          <FileInput
            error={errors}
            name={`icon_${field.id}_TeamEditingWindow`}
            register={register}
            setValue={setValue}
            clearErrors={clearErrors}
          />
          <TextField
            text={'alt'}
            error={errors}
            name={`alt_${field.id}_TeamEditingWindow`}
            register={register}
          />
          <TextField
            text={'href'}
            error={errors}
            name={`href_${field.id}_TeamEditingWindow`}
            register={register}
          />
          <TextField
            text={'ariaLabel'}
            error={errors}
            name={`ariaLabel_${field.id}_TeamEditingWindow`}
            register={register}
          />
          <ActionButtons
            text={'Delete social network'}
            handleClick={() => removeField(field.id)}
            ariaLabel={'Delete social network'}
            typeButton={'dangerous'}
          />
        </EditFieldWrapper>
      ))}
      <div className={'WrapperButton'}>
        <ActionButtons
          text={'add social network'}
          handleClick={addField}
          ariaLabel={'add social network'}
          type={'button'}
        />
      </div>
    </>
  )
}

export default TeamEditingWindow
