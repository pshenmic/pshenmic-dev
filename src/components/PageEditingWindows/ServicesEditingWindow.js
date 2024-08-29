import EditFieldWrapper from '../UI/EditFieldWrapper/EditFieldWrapper'
import TextField from '../UI/TextField/TextField'
import './PageEditingWindows.scss'

function ServicesEditingWindow ({ errors, register, setValue, clearErrors }) {
    return (
        <>
            <EditFieldWrapper title={'preview text'}>
                <TextField
                    text={'previewText'}
                    error={errors}
                    name={'previewText_ServicesEditingWindow'}
                    register={register}
                />
            </EditFieldWrapper> 
            <EditFieldWrapper title={'Component'}>
                <TextField
                    text={'title'}
                    error={errors}
                    name={'title_ServicesEditingWindow'}
                    register={register}
                    required={false}
                />
                <TextField
                    text={'description'}
                    error={errors}
                    name={'description_ServicesEditingWindow'}
                    register={register}
                    required={false}
                    richText={true}
                />
                <TextField
                    text={'href'}
                    error={errors}
                    name={'href_ServicesEditingWindow'}
                    register={register}
                />
                 <TextField
                    text={'ariaLabel'}
                    error={errors}
                    name={'ariaLabel_ServicesEditingWindow'}
                    register={register}
                />
            </EditFieldWrapper> 
        </>
    )
}

export default ServicesEditingWindow
