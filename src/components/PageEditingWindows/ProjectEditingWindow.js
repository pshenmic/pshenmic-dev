'use client'

import './PageEditingWindows.scss'
import FileInput from '../UI/FileInput/FileInput'
import TextField from '../UI/TextField/TextField'
import { useFormContext, useWatch } from 'react-hook-form';
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton';

function ProjectEditingWindow() {
  const { control } = useFormContext();
  const inputValueName = control ? useWatch({ control, name: 'name_ProjectEditingWindow' }) : '';
  const inputValueDescription = control ? useWatch({ control, name: 'description_ProjectEditingWindow' }) : '';
  const inputValueUrl = control ? useWatch({ control, name: 'url_ProjectEditingWindow' }) : '';

  return (
    <div className={'ProjectEditingWindow'}>
      <h2>CREATE A NEW PROJECT</h2>
      <FileInput
        name={'url_ProjectEditingWindow'}
        textName={inputValueName}
        textDescription={inputValueDescription}
        mountedPicture={inputValueUrl}
      />

      <TextField
        text={'Name'}
        name={'name_ProjectEditingWindow'}
        placeholder={'ex. Pshenmic.dev'}
        arrow={true}
        required={false}
      />

      <TextField
        text={'Description'}
        name={'description_ProjectEditingWindow'}
        placeholder={'Describe your new and beautiful project...'}
        required={true}
      />

      <TextField
        text={'Url'}
        name={'url_ProjectEditingWindow'}
        placeholder={'ex. https://pshenmic.dev/img/1.png'}
        required={true}
        valid={/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/}
      />

      <RegistrationButton
        className={'ProjectEditingWindow__Button'}
        text={'CREATE PROJECT'}
        ariaLabel={'Create project'}
        type={'submit'}
        disabled={!inputValueDescription || !inputValueUrl}
      />
    </div>
  )
}

export default ProjectEditingWindow
