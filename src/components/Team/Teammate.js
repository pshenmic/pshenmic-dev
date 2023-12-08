import './Teammate.scss'
import Link from 'next/link'

function Teammate ({name, role, photoSrc, discord, github, twitter}) {
    return (
        <div className="Teammate">

            <div className="Teammate__ImageContainer">
                <img src={ photoSrc }/>
            </div>

            <div className='Teammate__ContentContainer'>

                <div className="Teammate__Title">{ name }</div>

                <div className="Teammate__Description">{ role }</div>

                <div className='Teammate__Socials'>

                    {(github &&
                        <Link 
                            href={github} 
                            target="_blank" 
                            className="Teammate__SocialLink Teammate__SocialLink--Github">
                        </Link>
                    )}

                    {(discord &&
                        <Link 
                            href={discord} 
                            target="_blank" 
                            className="Teammate__SocialLink Teammate__SocialLink--Discord">
                        </Link>
                    )}

                    {(twitter &&
                        <Link 
                            href={twitter} 
                            className="Teammate__SocialLink Teammate__SocialLink--Twitter">
                        </Link>
                    )}

                </div>

            </div>
        </div>
    )
}

export default Teammate