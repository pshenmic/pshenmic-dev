import Link from 'next/link'
import './Post.scss'

function Post ({post}) {
    return (
        <div className="Post">

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

        </div>
    )
}
export default Post