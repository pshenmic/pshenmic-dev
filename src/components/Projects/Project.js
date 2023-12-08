import Link from 'next/link'

import './Project.scss'

function Project ({ project, closeHandler }) {

    return (
        <div className = 'Project'>

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

      </div>
    )
}

export default Project