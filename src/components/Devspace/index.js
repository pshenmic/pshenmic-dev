import Post from './Post.js'
import './Devspace.scss'

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

function Devspace () {

    const ListItems = posts.map((post, id) =>
        <Post 
            key={'post' + id}
            post = {post}
        />
    )

    return (
        <div className="Devspace">

            {/* <div className='Devspace__Title'>Updates</div> */}

            <div className="Devspace__NewsList">
                { ListItems }
            </div>

        </div>
    )
}

export default Devspace