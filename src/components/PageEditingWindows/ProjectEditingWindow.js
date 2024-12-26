import Image from 'next/image'
import './PageEditingWindows.scss'
import FileInput from '../UI/FileInput/FileInput'

function ProjectEditingWindow ({ errors, register, setValue, clearErrors }) {

  return (
    <div className={'ProjectEditingWindow'}>
        <h2>CREATE A NEW PROJECT</h2>
        <div className={'ProjectEditingWindow__ImageCard'}>
            <div className={'ProjectEditingWindow__ImageCard__Image'}>
              <Image src={'/images/pictureOfaBlindfold.png'} alt={'Project Image'} width={100} height={100} />
            </div>
            <div className={'ProjectEditingWindow__ImageCard__Info'}>
              <p>Project name...</p>
              <p>project link....</p>
              <p></p>
            </div>
        </div>
        <FileInput name={'ProjectEditingWindow__ImageCard__Image'} error={errors} setValue={setValue} clearErrors={clearErrors} register={register} text={'Project image'} required={false}
          richText={true}/>
    </div>
  )
}

export default ProjectEditingWindow
