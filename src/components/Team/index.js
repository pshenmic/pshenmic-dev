import Teammate from './Teammate'
import { motion as m } from 'framer-motion'
import './Team.scss'


function Team () {
    return (
        <m.div
            className="Team"
        >

            <div className="Team__TeammateList">

                <Teammate
                    id={1}
                    name={'Mikhail'}
                    username={'pshenmic'}
                    role={'Lead / Coder'}
                    photoSrc={'https://avatars.githubusercontent.com/u/17009187?v=4'}
                    github={'https://github.com/pshenmic'}
                    twitter={'https://twitter.com/pshenmic'}
                    discord={'https://discordapp.com/users/784071440864378911'}
                />

                <Teammate
                    id={2}
                    name={'Alex'}
                    username={'alexeyandreevsky'}
                    role={'Designer / Frontend dev'}
                    photoSrc={'https://avatars.githubusercontent.com/u/143793672?v=4'}
                    github={'https://github.com/alexeyandreevsky'}
                    discord={'https://discordapp.com/users/390865069195657216'}
                />

            </div>

        </m.div>
    )
}

export default Team
