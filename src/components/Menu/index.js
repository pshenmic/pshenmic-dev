import React, { useState, useEffect } from 'react'
import { motion as m } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Menu.scss'

const menuItems = [
  {
    href: '/',
    title: 'Updates',
    id: 'updates'
  },
  {
    href: '/services',
    title: 'Services',
    id: 'services'
  },
  {
    href: '/projects',
    title: 'Projects',
    id: 'projects'
  },
  {
    href: '/team',
    title: 'Team',
    id: 'team'
  }
]

const Menu = ({ selectItemCallback, defaultItem }) => {
  const [activeItem, setAtiveItem] = useState(defaultItem)

  useEffect(() => {
    selectItemCallback(activeItem)
  }, [activeItem, selectItemCallback])

  return (
    <m.div
      className={'Menu'}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={'Menu__Title'}>pshenmic.dev:</div>

      <div className={'Menu__Items'}>
        {menuItems.map((link) =>
          <m.div
            key={'menuitem' + link.id}
            className={`Menu__Item ${activeItem === link.id ? 'active' : ''}`}
            onClick={() => setAtiveItem(link.id)}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 / 5 }}
          >
            <Link to={link.href}><span>{link.title}</span></Link>
          </m.div>
        )}
      </div>
    </m.div>
  )
}

export default Menu
