'use client'

import { useDropzone } from 'react-dropzone'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Image from 'next/image'
import './FileInput.scss'

function FileInput({ textName, textLink, textDescription, mountedPicture, name,  }) {
  const [files, setFiles] = useState([])
  const { control, clearErrors, setValue, formState: { errors }, register } = useFormContext();
  const { hasOwnProperty } = Object.prototype

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))
    const file = acceptedFiles[0]
    if (file.size > 1000000) {
      setFiles([])
      setValue(name, null)
      return
    }
    if (file) {
      const reader = new FileReader()
      reader.onload = function (e) {
        const base64String = e.target.result.split(',')[1]
        const imageSrc = `data:${file.type};base64,${base64String}`
        setValue(name, imageSrc)
        clearErrors(name)
      }
      reader.readAsDataURL(file)
    }
  }

  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    }
  })

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <Image
        src={file.preview}
        alt={''}
        width={100}
        height={100}
      />
    </div>
  ))

  useEffect(() => () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <div className={'FileInput'}>
      <div className={`FileInput__Avatar ${hasOwnProperty.call(errors || {}, name) ? 'FileInput__Error' : ''}`} {...getRootProps()}>
        {files.length !== 0
          ? thumbs
          : <Image
            src={mountedPicture || '/assets/img/pictureOfaBlindfold.png'}
            width={100}
            height={100}
            alt={'Preview Image'}
          />
        }
        <input
          {...register(name, { required: true })}
          id={'fileInput'}
          {...getInputProps()}
          type={'file'}
        />
      </div>
      <div className={'FileInput__Info'}>
        <p className={'FileInput__Info__Name'} style={{ opacity: textName ? 1 : 0.3 }}>{textName || 'Project name...'}</p>
        <p className={'FileInput__Info__Link'}>{textLink || 'project link....'}</p>
        { textDescription && <p className={'FileInput__Info__Description'}>{textDescription}</p> }
      </div>
    </div>
  )
}

export default FileInput
