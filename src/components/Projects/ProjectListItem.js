import { motion as m } from 'framer-motion'
import Image from 'next/image'
import './ProjectListItem.scss'
import useGlobalStore from '@/store/store'
import EditButton from '../UI/Button/EditButton/EditButton'

function ProjectListItem ({ project, openHandler, id, openEditor }) {
  const admin = useGlobalStore(state => state.admin)

  return (
    <m.div
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
       { admin ?
          <div className={'ProjectListItem__WrapperEditButton'} onClick={(e) => e.stopPropagation()}>
            <EditButton handleClick={openEditor} type={'buttom'}/>
          </div>
        : null }
      <div className={'ProjectListItem__ImageContainer'}>
        <Image alt={project.title || ''} src={project.imgSrc} width={300} height={300}/>
      </div>
      <div className={'ProjectListItem__ContentContainer'}>
        <div className={'ProjectListItem__Title'}>{project.title}</div>
        <div className={'ProjectListItem__Description'}>{project.description}</div>
      </div>
    </m.div>
  )
}

export default ProjectListItem
