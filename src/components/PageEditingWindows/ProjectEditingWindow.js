'use client'

import './PageEditingWindows.scss'
import FileInput from '../UI/FileInput/FileInput'
import TextField from '../UI/TextField/TextField'
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton';
import useGlobalStore from '@/store/store';
import { useFormContext, useWatch } from 'react-hook-form';
import { showToast } from '@/lib/showToast';
import { useRef } from 'react';

function ProjectEditingWindow() {
  const { projectDataEditing, client, admin, setDocuments, documents } = useGlobalStore();
  const { control } = useFormContext();
  const inputValueName = control ? useWatch({ control, name: 'name_ProjectEditingWindow' }) : '';
  const inputValueDescription = control ? useWatch({ control, name: 'description_ProjectEditingWindow' }) : '';
  const inputValueUrl = control ? useWatch({ control, name: 'url_ProjectEditingWindow' }) : '';
  const inputValueImage = control ? useWatch({ control, name: 'image_ProjectEditingWindow' }) : '';
  const isDeletingRef = useRef(false);

  const handleDelete = async (projectId) => {
    if (isDeletingRef.current) return;
    try {
      isDeletingRef.current = true;
      if (!client || !client.platform || !admin || !projectId) {
        showToast('error', 'Client not found');
        return;
      }

      const [document] = await client.platform.documents.get(
        `${process.env.NEXT_PUBLIC_CONTRACT_ID_PROJECTS}.Project`,
        { where: [['$id', '==', projectId]] }
      );

      if (!document) {
        showToast('error', 'Document not found');
        console.error('Document structure:', document);
        return;
      }

      await client.platform.documents.broadcast({
        delete: [document],
      }, admin)

      const newDocuments = documents.filter(doc => doc.id !== projectId);
      setDocuments(newDocuments);

      showToast('success', 'Document deleted successfully');

    } catch (error) {
      console.error('Error deleting document:', error);
      showToast('error', 'Error deleting document');
    } finally {
      isDeletingRef.current = false;
    }
  };

  return (
    <div className={'ProjectEditingWindow'}>
      <h2>{projectDataEditing?.id ? 'UPDATE PROJECT' : 'CREATE A NEW PROJECT'}</h2>
      <FileInput
        textName={inputValueName}
        image={inputValueImage}
        textDescription={inputValueDescription}
        url={inputValueUrl}
      />

      <TextField
        text={'Name'}
        name={'name_ProjectEditingWindow'}
        placeholder={'ex. Pshenmic.dev'}
        arrow={true}
        required={true}
      />

      <TextField
        text={'Description'}
        name={'description_ProjectEditingWindow'}
        placeholder={'Describe your new and beautiful project...'}
        required={true}
      />

      <TextField
        text={'Image'}
        name={'image_ProjectEditingWindow'}
        placeholder={'ex. https://pshenmic.dev/img/1.png'}
        required={true}
        valid={/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/}
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
        text={projectDataEditing?.id ? 'UPDATE PROJECT' : 'CREATE PROJECT'}
        ariaLabel={'Create project'}
        type={'submit'}
        disabled={!inputValueDescription || !inputValueUrl || !inputValueImage}
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
