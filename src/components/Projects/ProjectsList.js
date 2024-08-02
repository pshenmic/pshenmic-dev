import { useState } from 'react'
import ProjectListItem from './ProjectListItem'
import Project from './Project'
import { motion as m, AnimatePresence } from 'framer-motion'
import './ProjectsList.scss'


const defaultProjectsList = [
  {
    title: 'Electrum Dash',
    description: 'A lightweight wallet for a Desktops & Android allow you to receive and spend Dash anywhere without downloading the blockchain with a PrivateSend support.',
    imgSrc: '/assets/img/dash-electrum-icon.png',
    githubLink: '',
    projectLink: 'http://dash-electrum.org/'
  },
  {
    title: 'Platform Explorer',
    description: 'Block explorer for a brand new Dash Platform chain. Explore latest Dash Evolution data such as Identities, Data Contracts, and Documents.',
    imgSrc: '/assets/img/platform-explorer-preview-300x300.jpg',
    githubLink: 'https://github.com/pshenmic/platform-explorer',
    projectLink: 'https://platform-explorer.com/'
  },
  {
    title: 'Dashmate Contribution',
    description: 'Masternode setup tool that drastically eases node configuration and setup with a nice & easy CLI interface. Built on top of Node.Js and Docker.',
    imgSrc: '/assets/img/dashmate-preview-300x300.jpg',
    githubLink: 'https://github.com/dashpay/platform/tree/master/packages/dashmate',
    projectLink: 'https://www.dashmate.org/'
  },
  {
    title: 'Dashboards',
    description: 'Monitoring toolset that keeps track of the current state of the services deployed in the pshenmic cloud. Ensure yourself the SLA and stability of the provided services or be first to notice the fatal issues happening in cloud or blockchain network!',
    imgSrc: '/assets/img/dashboards-preview-400x400.png',
    githubLink: '',
    projectLink: 'https://dashboards.pshenmic.dev/'
  }
]

export default function ProjectsList ({projects = defaultProjectsList }) {
  const [openedItem, setOpenedItem] = useState(null);

  const ListItems = projects.map((project, id) =>
    <ProjectListItem
      key={'project' + id}
      id={id}
      project = {project}
      hidden = {openedItem !== null && openedItem !== id}
      openHandler = {  () => setOpenedItem(id)  }
    />
  )

  return (
    <AnimatePresence  mode="wait">
      { openedItem !== null && (
        <m.div
          key={'project'}
        >
          <Project
            project = { projects[openedItem] }
            closeHandler = { () => setOpenedItem(null) }
          />
        </m.div>)
      }

      { openedItem === null && (
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
