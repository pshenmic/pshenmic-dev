import Teammate from './Teammate'
import './Team.scss'
import { motion as m } from 'framer-motion'


// const variants = {
//     open: { opacity: 1, x: 0 },
//     closed: { opacity: 0, x: "-100%" },
// }


function Team ({isOpen}) {
    return (
        <m.div 
            className="Team"
        >

            <div className="Team__TeammateList">

                <Teammate
                    id={1}
                    name={'Mikhail'}
                    role={'Team Leader'}
                    photoSrc={'https://avatars.githubusercontent.com/u/17009187?v=4'}
                    github={'https://github.com/pshenmic'}
                    twitter={'https://twitter.com/pshenmic'}
                    discord={'https://discordapp.com/users/784071440864378911'}
                />

                <Teammate
                    id={2}
                    name={'Alex'}
                    role={'Frontend Developer'}
                    photoSrc={'https://avatars.githubusercontent.com/u/143793672?v=4'}
                    github={'https://github.com/alexeyandreevsky'}
                    discord={'https://discordapp.com/users/390865069195657216'}
                />

            </div>

        </m.div>
    )
}

export default Team