import Link from 'next/link'
import { motion as m } from 'framer-motion'
import './Project.scss'

function Project ({ project, closeHandler, id }) {
    return (
      <m.div 
        className = 'Project'
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: .25 }}
      >

        <div className='Project__CloseButton' onClick = { closeHandler }><span>X</span></div>

        <div className='Project__ImageContainer'>
          <img src={ project.imgSrc }/>
        </div>

        <div className='Project__ContentContainer'>

          <div className='Project__Title'>{ project.title }</div>

          <div className='Project__Description'>{ project.description }</div>

          <div className='Project__LinksContainer'>
            {( project.gihubLink &&
              <Link 
                className='Project__Link Project__Link--Github' 
                href={ project.gihubLink } 
                target="_blank"
              >
                <span>Github</span>
              </Link>
            )}

            {( project.projectLink &&
              <Link 
                className='Project__Link Project__Link--Project' 
                href={ project.gihubLink } 
                target="_blank"
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