import './Updates.scss'
import Post from './Post.js'
import { motion as m } from 'framer-motion'


const posts = [
    {
        content: `New video on youtube! <br/>`,
        imgSrc: 'https://i.ytimg.com/an_webp/_aQF46s12HI/mqdefault_6s.webp?du=3000&sqp=CP7GzasG&rs=AOn4CLCBBs3FrN3hAKIPGShvo6g3J1RqKQ',
        externalLink: 'https://www.youtube.com/watch?v=_aQF46s12HI'
    },
    {
        content: 'content 123',
        imgSrc: '',
        externalLink: ''
    },
    {
        content: 'content 123',
        imgSrc: '',
        externalLink: ''
    },
    {
        content: 'content 123',
        imgSrc: '',
        externalLink: ''
    },
    {
        content: 'content 123',
        imgSrc: '',
        externalLink: ''
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