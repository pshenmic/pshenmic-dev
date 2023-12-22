import Link from 'next/link'
import './Post.scss'
import { motion as m } from 'framer-motion'

function Post ({post, id}) {
    return (
        <m.div 
            className="Post"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            whileHover={{
                x: -5,
                y: -5,
                transition: { duration: .5 },
            }}
            transition={{ duration: .5, delay: id/10 }}
        >

                {(post.imgSrc && 
                    <div className='Post__ImageContainer'>
                        <img src={ post.imgSrc }/>
                    </div>
                )}

            <div className='Project__ContentContainer'>

                <div  
                    className='Post__Content' 
                    dangerouslySetInnerHTML={{__html: post.content}} 
                />

                {( post.externalLink &&
                    <Link 
                        className='Post__Link' 
                        href={''} 
                        target="_blank"
                    >
                        <span>Link</span>
                    </Link>
                )}
                    
            </div>
        </m.div>
    )
}
export default Post