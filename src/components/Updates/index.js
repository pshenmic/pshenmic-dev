import './Updates.scss'
import Post from './Post.js'
import { PostTypeEnum } from '../../enums/postTypeEnum'

const posts = [
    {
        content: 'Electrum Dash 4.1.7.4 stable release is out. Build includes working PrivateSend for Linux, Mac and Windows. https://github.com/pshenmic/electrum-dash/releases/tag/4.1.7.4',
        imgSrc: '',
        externalLink: '',
        type: PostTypeEnum.STATIC
    },
    {
        content: 'Electrum Dash release candidate build is out with PrivateSend support back in the game. Feel free to test and report any bugs! https://github.com/pshenmic/electrum-dash/releases/tag/4.1.7.4-rc.9',
        imgSrc: '',
        externalLink: 'https://twitter.com/pshenmic/status/1747739859605709104',
        type: PostTypeEnum.TWITTER
    },
    {
        content: 'Electrum Dash wallet almost recovered PrivateSend support! New stable build is coming out soon in next few days! 🤙',
        imgSrc: '',
        externalLink: 'https://twitter.com/pshenmic/status/1746916402525552735',
        type: PostTypeEnum.TWITTER
    },
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
