'use client'

import { useDropzone } from 'react-dropzone'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import './FileInput.scss'

function FileInput ({ clearErrors, setValue, error, text, mountedPicture, name, required = true, register }) {
  const [files, setFiles] = useState([])
  const { hasOwnProperty } = Object.prototype
  // TODO sending a picture to the server (filesserv)
  // const [serverFiles, setServerFiles] = useState()

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
        // setServerFiles(imageSrc)
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
        width={200}
        height={200}
      />
    </div>
  ))

  useEffect(() => () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <div className={'FileInput'}>
      {text
        ? <p>{text}{required && <span>*</span>}</p>
        : null}

      <div className={`FileInput__Avatar ${hasOwnProperty.call(error, name) ? 'FileInput__Error' : ''}`} { ...getRootProps() }>
        {files.length > 0
          ? <button
              className={'FileInput__Delete'}
              onClick={(e) => {
                e.stopPropagation()
                setFiles([])
              }}
            >
              delete
            </button>
          : null
        }
        {files.length !== 0
          ? thumbs
          : <Image
              src={mountedPicture || '/assets/img/dash-electrum-icon.png'}
              width={200}
              height={200}
              alt={'avatar'}
            />
        }
        <input
          {...register(name, { required })}
          id={'fileInput'}
          {...getInputProps()}
          type={'file'}
        />
      </div>
    </div>
  )
}

export default FileInput
