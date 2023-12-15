import './Menu.scss'
import React, { useState, useEffect } from 'react';
import { motion as m } from 'framer-motion'

const Menu = ({selectItemCallback, defaultItem}) => {
    const [activeItem, setAtiveItem] = useState(defaultItem);

    useEffect(() => {
        selectItemCallback(activeItem)
    }, [activeItem]);

    return <m.div 
        className='Menu'
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1}}
        transition={{ duration: 0.5 }}
        >

        <div className='Menu__Title'>pshenmic.Dev:</div>

        <div className='Menu__Items'>
            <m.div
                className={`Menu__Item ${activeItem === 'devspace' ? 'active' : '' }`}
                onClick={() => setAtiveItem('devspace')}

                initial={{ x:-50, opacity: 0 }}
                animate={{ x:0, opacity: 1}}
                transition={{ duration: 0.5 }}
            >
                <span>Dev space</span>
            </m.div>
            
            <m.div 
                className={`Menu__Item ${activeItem === 'services' ? 'active' : '' }`}
                onClick={() => setAtiveItem('services')}

                initial={{ x:-50, opacity: 0 }}
                animate={{ x:0, opacity: 1}}
                transition={{ duration: .5, delay: 1/5  }}
            >
                <span>Services</span>
            </m.div>

            <m.div 
                className={`Menu__Item ${activeItem === 'projects' ? 'active' : '' }`}
                onClick={() => setAtiveItem('projects')}

                initial={{ x:-50, opacity: 0 }}
                animate={{ x:0, opacity: 1}}
                transition={{ duration: .5, delay: 2/5  }}
            >
                <span>Projects</span>
            </m.div>

            <m.div 
                className={`Menu__Item ${activeItem === 'team' ? 'active' : '' }`}
                onClick={() => setAtiveItem('team')}

                initial={{ x:-50, opacity: 0 }}
                animate={{ x:0, opacity: 1}}
                transition={{ duration: .5, delay: 3/5  }}
            >
                <span>Team</span>
            </m.div>
        </div>
    </m.div>
}

export default Menu;


