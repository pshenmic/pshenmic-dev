'use client'

import './FileInput.scss'
import { isValidImageUrl } from '@/lib/isValidImageUrl'

function FileInput({ textName, textDescription, url, image }) {
  return (
    <div className={'FileInput'}>
      <div className={'FileInput__Avatar'}>
        <img
          src={isValidImageUrl(image) ? image : '/assets/img/pictureOfaBlindfold.png'}
          width={100}
          height={100}
          alt={'Preview Image'}
        />
      </div>
      <div className={'FileInput__Info'}>
        <p className={'FileInput__Info__Name'} style={{ opacity: textName ? 1 : 0.3 }}>{textName || 'Project name...'}</p>
        { url && <p className={'FileInput__Info__Url'}>{url}</p> }
        { textDescription && <p className={'FileInput__Info__Description'}>{textDescription}</p> }
      </div>
    </div>
  )
}

export default FileInput
