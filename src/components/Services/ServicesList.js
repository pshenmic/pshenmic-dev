import { useState } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import Service from './Service'
import './ServiceListItem.scss'

const defaultServicesList = [
  {
    title: 'ElectrumX Dash',
    description: 'Electrum Dash is a lightweight wallet that allows you to send, receive and mix Dash without downloading blockchain. It distributes for Linux, Mac, Windows and Android devices.',
    link: 'https://electrum-dash.com'
  },
  {
    title: 'Platform Explorer (testnet)',
    description: 'Blockchain explorer for the upcoming L2 Dash Platform chain',
    link: 'https://platform-explorer.com'
  },
  {
    title: 'Dashboards (Monitoring)',
    description: 'A set of dashboards showing the current state of the projects and services of the pshenmic cloud.',
    link: 'https://dashboards.pshenmic.dev'
  }
]

function ServicesList ({ servicesList = defaultServicesList }) {
  const [openedItem, setOpenedItem] = useState(null)

  const ListItems = servicesList.map((service, id) =>
    <m.div
      key={'service' + id}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: id / 10 }}
      id={id}
      onClick = {() => setOpenedItem(id)}
    >
      <div className='ServiceListItem'>
        <div className='ServiceListItem__Title'>{ service.title }</div>
      </div>
    </m.div>
  )

  return (
    <AnimatePresence mode="wait">
      {openedItem !== null && (
        <m.div key={'service'}>
          <Service
            service = { servicesList[openedItem] }
            closeHandler = { () => setOpenedItem(null) }
          />
        </m.div>
      )}

      {openedItem === null && (
        <m.div key={'servicesList'} className={'ServicesList'}>
          {ListItems}
        </m.div>
      )}
    </AnimatePresence>
  )
}

export default ServicesList
