import Link from 'next/link'
import { motion as m } from 'framer-motion'
import './Service.scss'

const defaultServicesList = [
    {
      title: 'ElectrumX Dash [use copy link address]',
      description: 'Electrum Dash is a lightweight wallet that allows you to send, receive and mix Dash without downloading blockchain. It distributes for Linux, Mac, Windows and Android devices.',
      link: 'dash-electrum.pshenmic.dev:50002'
    },
    {
      title: 'Platform Explorer (testnet)',
      description: 'Blockchain explorer for the upcoming L2 Dash Platform chain',
      link: 'https://platform-explorer.com'
    },
    {
      title: 'Anypay Backend',
      description: 'An independent Anypay backend instance providing a reliable backend service for a Point-of-Sales mobile terminals',
      link: 'https://anypay.pshenmic.dev'
    },
    {
      title: 'Dashboards (Monitoring)',
      description: 'A set of dashboards showing the current state of the projects and services of the pshenmic cloud.',
      link: 'https://dashboards.pshenmic.dev'
    },
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
                target="_blank"
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
