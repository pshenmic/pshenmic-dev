import './Updates.scss'
import Post from './Post.js'
import { PostTypeEnum } from '../../enums/postTypeEnum'

const posts = [
    {
        content: 'Local Money concept is going to be resurrected soon in the Dash Incubator enabling P2P fiat payments governed by the network. Decentralized and Open-Sourced.',
        imgSrc: '',
        externalLink: '',
        type: PostTypeEnum.STATIC
    },
    {
        content: 'Electrum Dash just have upgraded to Python 3.10',
        imgSrc: '',
        externalLink: 'https://twitter.com/pshenmic/status/1737533844197126375',
        type: PostTypeEnum.TWITTER
    },
    {
        content: `How to install Dashmate on Ubuntu`,
        imgSrc: '//img.youtube.com/vi/'+ '_aQF46s12HI' +'/0.jpg',
        externalLink: 'https://www.youtube.com/watch?v=_aQF46s12HI',
        type: PostTypeEnum.YOUTUBE
    },
    {
        content: `Deployed an instance of Anypay API backend<br/>at https://anypay.pshenmic.dev/`,
        imgSrc: '',
        externalLink: 'https://anypay.pshenmic.dev/',
        type: PostTypeEnum.STATIC
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