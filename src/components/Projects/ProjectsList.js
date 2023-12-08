import { useState, useMemo, useEffect } from 'react'
import ProjectListItem from './ProjectListItem'
import Project from './Project'
import './ProjectsList.scss'


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

export default function ProjectsList ({projects = defaultProjectsList}) {
  const [openedItem, setOpenedItem] = useState(-1);

  useEffect(() => {
    console.log('some project was oppened. Need to animate it.')
  }, [openedItem])

  const ListItems = projects.map((project, id) =>
    <ProjectListItem 
      key={'project' + id}
      project = {project} 
      isOpen = {openedItem === id}
      hidden = {openedItem !== -1 && openedItem !== id}
      openHandler = {  () => setOpenedItem(id)  }
    />
  )

  return (
    <>
      {( openedItem !== -1 && 
        <Project 
          project = { projects[openedItem] } 
          closeHandler = { () => setOpenedItem(-1) }
        />
      )}

      <div className='ProjectsList'>
        {( openedItem === -1 && 
          ListItems
        )}
      </div>
    </>
  )
}