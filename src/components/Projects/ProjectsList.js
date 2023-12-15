import { useState, useMemo, useEffect } from 'react'
import ProjectListItem from './ProjectListItem'
import Project from './Project'
import './ProjectsList.scss'
import { motion as m, AnimatePresence } from 'framer-motion'


const defaultProjectsList = [
  {
    title: 'Anypay',
    description: 'Ok lets write something about project.Great project for everybody. Check it!',
    imgSrc: 'https://avatars.githubusercontent.com/u/12125403?s=200',
    gihubLink: 'https://github.com/anypay'
  },
  {
    title: 'Dash Electrum',
    description: 'Ok lets write something about project.Great project for everybody. Check it!',
    imgSrc: '',
    gihubLink: ''
  },
  {
    title: 'Platform explorer',
    description: 'Ok lets write something about project.Great project for everybody. Check it!',
    imgSrc: '',
    gihubLink: 'https://github.com/pshenmic/platform-explorer'
  },
  {
    title: 'Dashmate',
    description: 'Ok lets write something about project.Great project for everybody. Check it!',
    imgSrc: '',
    gihubLink: ''
  }
]

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" }
}

export default function ProjectsList ({projects = defaultProjectsList }) {
  const [openedItem, setOpenedItem] = useState(-1);

  useEffect(() => {
    console.log('some project was oppened. Need to animate it.')
  }, [openedItem])

  const ListItems = projects.map((project, id) =>
    <ProjectListItem
      key={'project' + id}
      id={id}
      project = {project} 
      hidden = {openedItem !== -1 && openedItem !== id}
      openHandler = {  () => setOpenedItem(id)  }
    />
  )

  return (
    <AnimatePresence  mode="wait">
      { openedItem !== -1 && (
        <m.div
          key={'project'}
        >
          <Project 
            project = { projects[openedItem] } 
            closeHandler = { () => setOpenedItem(-1) }
          />
        </m.div>)
      }
      
      { openedItem === -1 &&( 
        <m.div
          key={'projectsList'}
          className='ProjectsList'
        >
            {ListItems}
        </m.div>
      )}
    </AnimatePresence>
  )
}