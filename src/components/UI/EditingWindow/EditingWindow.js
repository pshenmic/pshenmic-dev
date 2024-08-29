'use client'

import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import useGlobalStore from '@/store/store'
import DarkWrapper from '../DarkWrapper/DarkWrapper'
import ActionButtons from '../Button/ActionButtons/ActionButtons'
import Image from 'next/image'
import PageEditingWindows from '@/components/PageEditingWindows/PageEditingWindows'
import './EditingWindow.scss'

function EditingWindow() {
    const openEditingWindow = useGlobalStore(state => state.openEditingWindow)
    const setOpenEditingWindow = useGlobalStore(state => state.setOpenEditingWindow)
    const admin = useGlobalStore(state => state.admin)

    const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm()

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
            { admin
                ? <DarkWrapper open={openEditingWindow}>
                    <div className={'EditingWindow'}>
                        <form onKeyDown={handleKeyDown} className={'EditingWindow__Window'} onSubmit={handleSubmit(onSubmit)}>
                            <button 
                                className={'EditingWindow__Close'}
                                aria-label={'Close The Window'}
                                onClick={() => setOpenEditingWindow(false)}
                                type={'button'}
                            >
                                <Image src={'/assets/img/cross.svg'} width={24} height={24} alt={'close'}/>
                            </button>
                            <div className={'EditingWindow__WrapperEditableFields'}>
                                <PageEditingWindows
                                    errors={errors}
                                    register={register}
                                    setValue={setValue}
                                    clearErrors={clearErrors}
                                />
                            </div>
                            <div className={'EditingWindow__WrapperButton'}>
                                <ActionButtons
                                    text={'Save'}
                                    ariaLabel={'save'}
                                    type={'submit'}
                                />
                                <ActionButtons
                                    text={'Delete'}
                                    ariaLabel={'delete'}
                                    typeButton={'dangerous'}
                                />
                            </div>
                        </form>
                    </div>
                </DarkWrapper>
            : null }
        </>
    )
}

export default EditingWindow
