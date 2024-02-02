import { useState } from 'react'
import Link from 'next/link'
import { motion as m, AnimatePresence } from 'framer-motion'
import Service from './Service'
import './ServiceListItem.scss'

const defaultServicesList = [
    {
      title: 'ElectrumX (Dash)',
      description: 'Ok lets write something about project.Great project for everybody. Check it!',
      imgSrc: '',
      link: '#'
    },
    {
      title: 'Blockbook (Dash)',
      description: 'Ok lets write something about project.Great project for everybody. Check it!',
      imgSrc: '',
      link: '#'
    },
    {
      title: 'Dash Platform Explorer',
      description: 'Ok lets write something about project.Great project for everybody. Check it!',
      imgSrc: '',
      link: '#'
    }
]


function ServicesList ({servicesList = defaultServicesList}) {
    const [openedItem, setOpenedItem] = useState(null);
    
    const ListItems = servicesList.map((service, id) => 
        <m.div
            key={'service' + id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: .5, delay: id/10 }}
            id={id}
            onClick = {  () => setOpenedItem(id)  }
        >
            <div className='ServiceListItem'>
                <div className='ServiceListItem__Title'>{ service.title }</div>
            </div>
        </m.div>
    );

    return (
        <AnimatePresence mode="wait">
          { openedItem !== null && (
            <m.div
              key={'service'}
            >
              <Service 
                service = { servicesList[openedItem] } 
                closeHandler = { () => setOpenedItem(null) }
              />
            </m.div>)
          }
          
          { openedItem === null && ( 
            <m.div
              key={'servicesList'}
              className='ServicesList'
            >
                {ListItems}
            </m.div>
          )}
        </AnimatePresence>
      )
}

export default ServicesList