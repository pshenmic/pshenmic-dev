import { motion as m } from 'framer-motion'
import Image from 'next/image'
import './ProjectListItem.scss'

function ProjectListItem ({ project, openHandler, id }) {
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
