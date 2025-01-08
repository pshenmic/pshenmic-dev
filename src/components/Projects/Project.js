'use client'

import Image from 'next/image'
import { motion as m } from 'framer-motion'
import './Project.scss'
import Grade from '../UI/Grade/Grade'
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
import { useState } from 'react'
import Task from './Task'

function Project({ project, closeHandler }) {
  const [activeTab, setActiveTab] = useState('ALL')

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
            <p>Electrum</p>
          </button>
          <RegistrationButton text={'2 PENDING CLAIM'} disabled={true} className={'Project__Header__Button'} />
        </div>
        <RegistrationButton text={'ADD TASK'} disabled={true} />
      </div>

      <div className={'Project__ContentContainer'}>
        <div className={'Project__ImageContainerWrapper'}>
          {(project.image &&
            <div className={'Project__ImageContainer'}>
              <Image alt={project.title || ''} src={project.image} width={220} height={220} />
            </div>
          )}
          <Grade />
        </div>
        <div className={'Project__Description'}>{project.description}</div>
      </div>

      <div className={'Project__Navigation'}>
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
      <TabContent tab={activeTab} />
    </m.div>
  )
}

export default Project
