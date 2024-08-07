import Link from 'next/link'
import Image from 'next/image'
import { motion as m } from 'framer-motion'
import './Project.scss'

function Project ({ project, closeHandler }) {
  return (
    <m.div
      className={'Project'}
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className={'Project__CloseButton'} onClick={closeHandler}>
        <span>X</span>
      </div>

      {(project.imgSrc &&
        <div className={'Project__ImageContainer'}>
          <Image alt={project.title || ''} src={project.imgSrc} width={300} height={300}/>
        </div>
      )}

      <div className={'Project__ContentContainer'}>
        <div className={'Project__Title'}>{project.title}</div>

        <div className={'Project__Description'}>{project.description}</div>

        <div className={'Project__LinksContainer'}>
          {(project.githubLink &&
            <Link
              className={'Project__Link Project__Link--Github'}
              href={project.githubLink}
              target={'_blank'}
            >
              <span>Github</span>
            </Link>
          )}

          {(project.projectLink &&
            <Link
              className={'Project__Link Project__Link--Project'}
              href={project.projectLink}
              target={'_blank'}
            >
              <span>Project</span>
            </Link>
          )}
        </div>
      </div>
    </m.div>
  )
}

export default Project
