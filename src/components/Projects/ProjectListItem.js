'use client'

import Image from 'next/image'
import useGlobalStore from '@/store/store'
import EditButton from '../UI/Button/EditButton/EditButton'
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
import Grade from '../UI/Grade/Grade'
import { motion as m } from 'framer-motion'
import { isValidImageUrl } from '@/lib/isValidImageUrl'
import { memo } from 'react'
import { formatOwnerId, truncateText } from '@/lib/truncateText'
import './ProjectListItem.scss'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'

function ProjectListItem({ project, openHandler, id, openEditor }) {
  const admin = useGlobalStore(state => state.admin)

  return (
    <m.li
      className={'ProjectListItem'}
      onClick={openHandler}
      whileHover={{
        transition: { duration: 0.5 }
      }}
      transition={{ duration: 0.5, delay: id / 10 }}
    >
      {/* <p className={'ProjectListItem__PendingClaim'}>PENDING CLAIM</p> */}
      <p className={`ProjectListItem__Domain ${admin ? 'ProjectListItem__Domain--Admin' : ''}`}>
        {project?.ownerName ? formatOwnerId(project.ownerName) : formatOwnerId(project.ownerId) || ''}
      </p>
      {admin
        ? <div className={'ProjectListItem__WrapperEditButton'} onClick={(e) => e.stopPropagation()}>
          <EditButton handleClick={() => openEditor(project)} type={'buttom'} />
        </div>
        : null}
      <div className={'ProjectListItem__ImageContainer'}>
        <img
          alt={project.title || ''}
          src={isValidImageUrl(project?.image) ? project.image : '/assets/img/dash-electrum-icon.png'}
          width={220}
          height={220}
        />
      </div>
      <div className={'ProjectListItem__ContentContainer'}>
        <p className={'ProjectListItem__Title'}>{project.name}</p>
        <ReactMarkdown remarkPlugins={[remarkGfm]} className={'ProjectListItem__Description'}>{truncateText(project.description, 75)}</ReactMarkdown>
        <div className={'ProjectListItem__WrapperButtons'}>
          <RegistrationButton
            className={'ProjectListItem__ButtonTasks'}
            text={project?.tasts?.length > 0 ? `${project.tasts.length} Tasks` : 'No Tasks'}
            ariaLabel={'Tasks'}
            disabled={project?.tasts?.length === 0}
          />
          {project?.pendingClaims?.length > 0 ?
            <RegistrationButton
              className={'ProjectListItem__ButtonPendingClaims'}
              text={`${project.pendingClaims.length} Pending Claims`}
              ariaLabel={'Pending Claims'}
            />
            : null
          }
        </div>
        <div className={'ProjectListItem__Footer'}>
          <Grade />
          {admin ?
            <RegistrationButton
              className={'ProjectListItem__ButtonAddTask'}
              text={`ADD TASK`}
              ariaLabel={'ADD TASK'}
            />
            : null
          }
        </div>
      </div>
    </m.li>
  )
}

export default memo(ProjectListItem)
