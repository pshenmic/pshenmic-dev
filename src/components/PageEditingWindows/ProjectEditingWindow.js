import { useCallback, useState } from 'react'
import EditFieldWrapper from '../UI/EditFieldWrapper/EditFieldWrapper'
import FileInput from '../UI/FileInput/FileInput'
import TextField from '../UI/TextField/TextField'
import ActionButtons from '../UI/Button/ActionButtons/ActionButtons'
import './PageEditingWindows.scss'

function ProjectEditingWindow({ errors, register, setValue, clearErrors }) {
    const [link, setLink] = useState([])

    const addField = useCallback(() => {
        setLink([...link, { id: Date.now() }])
    }, [link])

    const removeField = useCallback((id) => {
        setLink(link.filter(field => field.id !== id))
    }, [link])

    return (
        <>
            <EditFieldWrapper title={'preview card'}>
                <FileInput
                    text={'imgPreview'}
                    error={errors}
                    name={'imgPreview_ProjectEditingWindow'}
                    register={register}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />
                <TextField
                    text={'previewTitle'}
                    error={errors}
                    name={'previewTitle_ProjectEditingWindow'}
                    register={register}
                    required={false}
                />
                <TextField
                    text={'previewDescription'}
                    error={errors}
                    name={'previewDescription_ProjectEditingWindow'}
                    register={register}
                    required={false}
                    richText={true}
                />
            </EditFieldWrapper>
            <EditFieldWrapper title={'Component'}>
                <FileInput
                    text={'img'}
                    error={errors}
                    name={'img_ProjectEditingWindow'}
                    register={register}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />
                <TextField
                    text={'title'}
                    error={errors}
                    name={'title_ProjectEditingWindow'}
                    register={register}
                    required={false}
                />
                <TextField
                    text={'description'}
                    error={errors}
                    name={'description_ProjectEditingWindow'}
                    register={register}
                    required={false}
                    richText={true}
                />
            </EditFieldWrapper>
            {link.map((field, i) => (
                <EditFieldWrapper key={field.id} title={`Link ${i + 1}`}>
                    <TextField
                        text={'href'}
                        error={errors}
                        name={`href_${field.id}_ProjectEditingWindow`}
                        register={register}
                    />
                    <TextField
                        text={'ariaLabel'}
                        error={errors}
                        name={`ariaLabel_${field.id}_ProjectEditingWindow`}
                        register={register}
                    />
                    <TextField
                        text={'name'}
                        error={errors}
                        name={`name_${field.id}_ProjectEditingWindow`}
                        register={register}
                    />
                    <FileInput
                        text={'icon'}
                        error={errors}
                        name={`icon_${field.id}_ProjectEditingWindow`}
                        register={register}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                    <ActionButtons
                        text={'Delete project'}
                        handleClick={() => removeField(field.id)}
                        ariaLabel={'Delete project'}
                        typeButton={'dangerous'}
                    />
                </EditFieldWrapper>
            ))}
            <div className={'WrapperButton'}>
                <ActionButtons
                    text={'add project'}
                    handleClick={addField}
                    ariaLabel={'add project'}
                    type={'button'}
                />
            </div>
        </>
    )
}

export default ProjectEditingWindow
