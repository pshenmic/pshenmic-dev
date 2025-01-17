'use client'

import { useFormContext } from 'react-hook-form'
import Image from 'next/image'
import './FileInput.scss'
import { isValidImageUrl } from '@/lib/isValidImageUrl'

function FileInput({ textName, textDescription, mountedPicture, name, image }) {
  const { control, clearErrors, setValue, formState: { errors }, register } = useFormContext();
  const { hasOwnProperty } = Object.prototype

  return (
    <div className={'FileInput'}>
      <div className={`FileInput__Avatar ${hasOwnProperty.call(errors || {}, name) ? 'FileInput__Error' : ''}`}  >
        <img
          src={isValidImageUrl(image) ? image : '/assets/img/pictureOfaBlindfold.png'}
          width={100}
          height={100}
          alt={'Preview Image'}
        />
      </div>
      <div className={'FileInput__Info'}>
        <p className={'FileInput__Info__Name'} style={{ opacity: textName ? 1 : 0.3 }}>{textName || 'Project name...'}</p>
        { mountedPicture && <p className={'FileInput__Info__MountedPicture'}>{mountedPicture}</p>}
        {textDescription && <p className={'FileInput__Info__Description'}>{textDescription}</p>}
      </div>
    </div>
  )
}

export default FileInput
