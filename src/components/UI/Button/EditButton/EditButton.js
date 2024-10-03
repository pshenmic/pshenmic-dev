import Image from 'next/image'
import './EditButton.scss'

function EditButton ({ ariaLabel, handleClick, ...props }) {
  return (
    <button
      className={'Edit'}
      aria-label={ariaLabel}
      onClick={handleClick}
      {...props}
    >
      <Image src={'/assets/img/tabler_edit.svg'} width={45} height={45} alt={'edit'}/>
    </button>
  )
}

export default EditButton
