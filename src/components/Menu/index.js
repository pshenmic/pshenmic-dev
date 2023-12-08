import './Menu.scss'
import React, { useState, useEffect } from 'react';


const Menu = ({selectItemCallback, defaultItem}) => {
    const [activeItem, setAtiveItem] = useState(defaultItem);

    useEffect(() => {
        selectItemCallback(activeItem)
    }, [activeItem]);

    return <div className='Menu'>
        <div className='Menu__Title'>pshenmic.Dev:{'{'}</div>

        <div className='Menu__Items'>
            <div 
                className={`Menu__Item ${activeItem === 'devspace' ? 'active' : '' }`}
                onClick={() => setAtiveItem('devspace')}
            >
                <span>Dev space</span>
            </div>
            
            <div 
                className={`Menu__Item ${activeItem === 'services' ? 'active' : '' }`}
                onClick={() => setAtiveItem('services')}
            >
                <span>Services</span>
            </div>

            <div 
                className={`Menu__Item ${activeItem === 'projects' ? 'active' : '' }`}
                onClick={() => setAtiveItem('projects')}
            >
                <span>Projects</span>
            </div>

            <div 
                className={`Menu__Item ${activeItem === 'team' ? 'active' : '' }`}
                onClick={() => setAtiveItem('team')}
            >
                <span>Team</span>
            </div>
        </div>
    </div>
}

export default Menu;


