import './Updates.scss'
import Post from './Post.js'
import { motion as m } from 'framer-motion'
import { postTypesEnum } from '../../enums/postTypesEnum'

const posts = [
    {
        content: 'Local Money concept is going to be resurrected soon in the Dash Incubator enabling P2P fiat payments governed by the network. Decentralized and Open-Sourced.',
        imgSrc: '',
        externalLink: '',
        type: postTypesEnum.static
    },
    {
        content: 'Electrum Dash just have upgraded to Python 3.10',
        imgSrc: '',
        externalLink: 'https://twitter.com/pshenmic/status/1737533844197126375',
        type: postTypesEnum.twitter
    },
    {
        content: `How to install Dashmate on Ubuntu`,
        imgSrc: '//img.youtube.com/vi/'+ '_aQF46s12HI' +'/0.jpg',
        externalLink: 'https://www.youtube.com/watch?v=_aQF46s12HI',
        type: postTypesEnum.youtube
    },
    {
        content: `Deployed an instance of Anypay API backend at https://anypay.pshenmic.dev/`,
        imgSrc: '',
        externalLink: 'https://anypay.pshenmic.dev/',
        type: postTypesEnum.static
    }
]

function Updates () {

    const ListItems = posts.map((post, id) =>
        <Post 
            key={'post' + id}
            post = {post}
            id={id}
        />
    )

    return (
        <div 
            className="Devspace"
        >
            { ListItems }
        </div>
    )
}

export default Updates