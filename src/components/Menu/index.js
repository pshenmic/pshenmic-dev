import React, { useState, useEffect } from 'react'
import { motion as m } from 'framer-motion'
import { Link } from 'react-router-dom'
import { usePathname } from 'next/navigation'
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

const menuItemsForAdmin = [
  {
    href: '/admin',
    title: 'Updates',
    id: 'updates'
  },
  {
    href: '/admin/services',
    title: 'Services',
    id: 'services'
  },
  {
    href: '/admin/projects',
    title: 'Projects',
    id: 'projects'
  },
  {
    href: '/admin/team',
    title: 'Team',
    id: 'team'
  },
  {
    href: '/admin/tasks',
    title: 'Tasks',
    id: 'tasks'
  }
]

const Menu = ({ selectItemCallback, defaultItem }) => {
  const [activeItem, setAtiveItem] = useState(defaultItem)
  const [data, setData] = useState([])
  const path = usePathname()

  useEffect(() => {
    if (path.includes('admin') && menuItemsForAdmin) {
      setData(menuItemsForAdmin)
      return
    }
    if (menuItems) {
      setData(menuItems)
    }
  }, [path, menuItemsForAdmin, menuItems])

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
        { data.length > 0
          ? data.map((link) =>
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
          )
          : null }
      </div>
    </m.div>
  )
}

export default Menu
