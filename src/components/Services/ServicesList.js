import Link from 'next/link'
import { motion as m } from 'framer-motion'
import './Service.scss'

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
    
    const ListItems = servicesList.map((service, id) => 
        <m.div
            key={'service' + id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: .5, delay: id/10 }}
        >
            <Link 
                href={service.link} 
                className='Service'
            >
                <div className='Service__Title'>{ service.title }</div>
            </Link>
        </m.div>
    );

    return (
        <div className='ServicesList'>
            { ListItems }
        </div>
    )
}

export default ServicesList