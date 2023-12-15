import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion as m } from 'framer-motion'

import './ProjectListItem.scss'

function ProjectListItem ({ project, openHandler, id }) {

    return (
        <m.div
          className = 'ProjectListItem'
          onClick = { openHandler }

          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          whileHover={{
              x: -5,
              y: -5,
              transition: { duration: .5 },
          }}
          transition={{ duration: .5, delay: id/10 }}
        >

        <div className='ProjectListItem__ImageContainer'>
          <img src={ project.imgSrc }/>
        </div>

        <div className='ProjectListItem__ContentContainer'>

          <div className='ProjectListItem__Title'>{ project.title }</div>

          <div className='ProjectListItem__Description'>{ project.description }</div>

        </div>

      </m.div>
    )
}

export default ProjectListItem