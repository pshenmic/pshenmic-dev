import { useState, useMemo, useEffect } from 'react'
import ProjectListItem from './ProjectListItem'
import Project from './Project'
import './ProjectsList.scss'
import { motion as m, AnimatePresence } from 'framer-motion'


const defaultProjectsList = [
  {
    title: 'Anypay',
    description: 'Anypay is an easy-to-use, multi-coin payment processor helping businesses accept Dash since 2016. A fully open-source suite of tools offers e-commerce plugins, POS integrations, web & mobile apps, and APIs for developers.',
    imgSrc: '/assets/img/anypay-preview-400x400.jpg',
    gihubLink: 'https://github.com/anypay',
    projectLink: 'https://anypayx.com/'
  },
  {
    title: 'Dash Electrum',
    description: 'A lightweight wallet for a Desktops & Android allow you to receive and spend Dash anywhere without downloading the blockchain with a PrivateSend support.',
    imgSrc: '/assets/img/dash-electrum-icon.png',
    gihubLink: '',
    projectLink: 'https://docs.dash.org/ru/stable/docs/user/wallets/electrum/index.html'
  },
  {
    title: 'Platform explorer',
    description: 'Block explorer for a brand new Dash Platform chain. Explore latest Dash Evolution data such as Identities, Data Contracts, and Documents.',
    imgSrc: '/assets/img/platform-explorer-preview-300x300.jpg',
    gihubLink: 'https://github.com/pshenmic/platform-explorer',
    projectLink: 'https://platform-explorer.com/'
  },
  {
    title: 'Dashmate',
    description: 'Masternode setup tool that drastically eases node configuration and setup with a nice & easy CLI interface. Built on top of Node.Js and Docker.',
    imgSrc: '/assets/img/dashmate-preview-300x300.jpg',
    gihubLink: '',
    projectLink: 'https://www.dashmate.org/'
  }
]

export default function ProjectsList ({projects = defaultProjectsList }) {
  const [openedItem, setOpenedItem] = useState(-1);

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
      
      { openedItem === -1 && ( 
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