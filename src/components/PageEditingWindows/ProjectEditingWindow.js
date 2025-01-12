'use client'

import './PageEditingWindows.scss'
import FileInput from '../UI/FileInput/FileInput'
import TextField from '../UI/TextField/TextField'
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton';
import useGlobalStore from '@/store/store';
import { useFormContext, useWatch } from 'react-hook-form';
import { showToast } from '@/lib/showToast';

function ProjectEditingWindow() {
  const { projectDataEditing, client, admin } = useGlobalStore();
  const { control } = useFormContext();
  const inputValueName = control ? useWatch({ control, name: 'name_ProjectEditingWindow' }) : '';
  const inputValueDescription = control ? useWatch({ control, name: 'description_ProjectEditingWindow' }) : '';
  const inputValueUrl = control ? useWatch({ control, name: 'url_ProjectEditingWindow' }) : '';

  const handleDelete = async (projectId) => {
    try {
        if (!client || !client.platform) {
            showToast('error', 'Client not found');
            return;
        }

        const [document] = await client.platform.documents.get(
            `${process.env.NEXT_PUBLIC_CONTRACT_ID_PROJECTS}.Project`,
            { where: [['$id', '==', projectId]] }
        );

        if (!document) {
            showToast('error', 'Document not found');
            return;
        }

        await client.platform.documents.broadcast({
            delete: [document],
        }, admin);

        showToast('success', 'Document deleted successfully');

    } catch (error) {
        console.error('Error deleting document:', error);
        showToast('error', 'Error deleting document');
    }
};

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

      {projectDataEditing?.id && <RegistrationButton
        className={'ProjectEditingWindow__ButtonDelete'}
        text={'DELETE PROJECT'}
        ariaLabel={'Delete project'}
        onClick={() => handleDelete(projectDataEditing?.id)}
      />}
    </div>
  )
}

export default ProjectEditingWindow
