import { motion as m } from 'framer-motion'
import Image from 'next/image'
import useGlobalStore from '@/store/store'
import EditButton from '../UI/Button/EditButton/EditButton'
import './ProjectListItem.scss'
import { truncateText } from '@/lib/truncateText'
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
import Grade from '../UI/Grade/Grade'

function ProjectListItem({ project, openHandler, id, openEditor }) {
  const admin = useGlobalStore(state => state.admin)

  return (
    <m.li
      className={'ProjectListItem'}
      onClick={openHandler}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{
        x: -5,
        y: -5,
        transition: { duration: 0.5 }
      }}
      transition={{ duration: 0.5, delay: id / 10 }}
    >
      {admin
        ? <div className={'ProjectListItem__WrapperEditButton'} onClick={(e) => e.stopPropagation()}>
          <EditButton handleClick={openEditor} type={'buttom'} />
        </div>
        : null}
      <div className={'ProjectListItem__ImageContainer'}>
        <Image alt={project.title || ''} src={project.image} width={220} height={220} />
      </div>
      <div className={'ProjectListItem__ContentContainer'}>
        <p className={'ProjectListItem__Title'}>{project.name}</p>
        <p className={'ProjectListItem__Description'}>{truncateText(project.description, 75)}</p>
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

export default ProjectListItem
