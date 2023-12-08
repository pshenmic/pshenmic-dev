import { useState, useEffect } from 'react'
import Link from 'next/link'

import './ProjectListItem.scss'

function ProjectListItem ({ project, openHandler, isOpen, hidden }) {

    return (
        <div
          className = 'ProjectListItem'
          onClick = { openHandler }
        >

        <div className='ProjectListItem__ImageContainer'>
          <img src={ project.imgSrc }/>
        </div>

        <div className='ProjectListItem__ContentContainer'>

          <div className='ProjectListItem__Title'>{ project.title }</div>

          <div className='ProjectListItem__Description'>{ project.description }</div>

        </div>

      </div>
    )
}

export default ProjectListItem