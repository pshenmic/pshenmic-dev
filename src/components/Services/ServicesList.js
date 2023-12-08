import Link from 'next/link'
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
        <Link 
            href={service.link} 
            key={'service' + id}
            className='Service'
        >
            <div className='Service__Title'>{ service.title }</div>
        </Link>
    );

    return (
        <div>
            { ListItems }
        </div>
    )
}

export default ServicesList