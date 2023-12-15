import Link from 'next/link'
import { motion as m } from 'framer-motion'

import './Project.scss'

function Project ({ project, closeHandler, id }) {

    return (
      <m.div 
        className = 'Project'
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: .25 }}
      >

        <div className='Project__CloseButton' onClick = { closeHandler }><span>X</span></div>

        <div className='Project__ImageContainer'>
          <img src={ project.imgSrc }/>
        </div>

        <div className='Project__ContentContainer'>

          <div className='Project__Title'>{ project.title }</div>

          <div className='Project__Description'>{ project.description }</div>

          {( project.gihubLink &&
            <Link 
              className='Project__GithubLink' 
              href={ project.gihubLink } 
              target="_blank"
            >
              <span>Github</span>
            </Link>
          )}

        </div>

      </m.div>
    )
}

export default Project