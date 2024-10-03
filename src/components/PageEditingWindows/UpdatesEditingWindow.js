import EditFieldWrapper from '../UI/EditFieldWrapper/EditFieldWrapper'
import FileInput from '../UI/FileInput/FileInput'
import TextField from '../UI/TextField/TextField'
import './PageEditingWindows.scss'

function UpdatesEditingWindow ({ errors, register, setValue, clearErrors }) {
  return (
    <>
      <EditFieldWrapper title={'preview card'}>
        <FileInput
          text={'img'}
          error={errors}
          name={'img_UpdatesEditingWindow'}
          register={register}
          setValue={setValue}
          clearErrors={clearErrors}
          required={false}
        />
        <TextField
          text={'description'}
          error={errors}
          name={'description_UpdatesEditingWindow'}
          register={register}
          richText={true}
        />
        <TextField
          text={'ariaLabel'}
          error={errors}
          name={'ariaLabel_UpdatesEditingWindow'}
          register={register}
        />
        <TextField
          text={'href'}
          error={errors}
          name={'href_UpdatesEditingWindow'}
            register={register}
        />
        <FileInput
          text={'networkIcon'}
          error={errors}
          name={'networkIcon_UpdatesEditingWindow'}
          register={register}
          setValue={setValue}
          clearErrors={clearErrors}
          required={false}
        />
      </EditFieldWrapper>
    </>
  )
}

export default UpdatesEditingWindow
