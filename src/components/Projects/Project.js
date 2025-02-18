'use client'

import Image from 'next/image'
import Grade from '../UI/Grade/Grade'
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
import Task from './Task'
import { isValidImageUrl } from '@/lib/isValidImageUrl'
import { motion as m } from 'framer-motion'
import { useState } from 'react'
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown'
import './Project.scss'
import EditButton from '../UI/Button/EditButton/EditButton'
import useGlobalStore from '@/store/store'

function Project({ project, closeHandler, openEditor }) {
  const [activeTab, setActiveTab] = useState('ALL')
  const admin = useGlobalStore(state => state.admin)

  const TabContent = ({ tab }) => {
    switch (tab) {
      case 'ALL':
        return (
          <Task />
        );
      case 'IN PROGRESS':
        return (
          <Task />

        );
      case 'COMPLETED':
        return (
          <Task />

        );
      default:
        return (
          <Task />
        );
    }
  };

  return (
    <m.div
      className={'Project'}
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className={'Project__Header'}>
        <div className={'Project__Header__ButtonWrapper'}>
          <button className={'Project__Header__CloseButton'} onClick={closeHandler}>
            <span>{'<'}</span>
          </button>
          <p className={'Project__Header__Name'}>{project.name}</p>
          <RegistrationButton text={'2 PENDING CLAIM'} disabled={true} className={'Project__Header__Button'} />
        </div>
        {admin
          ? <div className={'Project__Header__ButtonWrapper'}>
            <RegistrationButton text={'ADD TASK'} disabled={true} />
            <RegistrationButton text={'EDIT'} handleClick={() => openEditor(project)}/>
          </div>
          : null}
      </div>

      <div className={'Project__ContentContainer'}>
        <div className={'Project__ImageContainerWrapper'}>
          {(project.image &&
            <div className={'Project__ImageContainer'}>
              <img alt={project.title || ''} src={isValidImageUrl(project?.image) ? project.image : '/assets/img/dash-electrum-icon.png'}
                width={220} height={220} />
            </div>
          )}
          <Grade />
        </div>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className={'Project__Description'}
        >
          {`${project.description}`}
        </ReactMarkdown>
      </div>

      {/* <div className={'Project__Navigation'}>
        {['ALL', 'IN PROGRESS', 'COMPLETED', 'ABANDONED', 'PAID'].map(tab => (
          <button
            key={tab}
            className={`Project__Navigation__NavButton ${activeTab === tab ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(tab);
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <TabContent tab={activeTab} /> */}
    </m.div>
  )
}

export default Project
