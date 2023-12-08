import Teammate from './Teammate'
import './Team.scss'

function Team () {
    return (
        <div className="Team">

            <div className="Team__TeammateList">

                <Teammate
                    name={'Mikhail'}
                    role={'Team Leader'}
                    photoSrc={'https://avatars.githubusercontent.com/u/17009187?v=4'}
                    github={'https://github.com/pshenmic'}
                    twitter={'https://twitter.com/pshenmic'}
                    discord={'https://discordapp.com/users/784071440864378911'}
                />

                <Teammate
                    name={'Alex'}
                    role={'Frontend Developer'}
                    photoSrc={'https://avatars.githubusercontent.com/u/143793672?v=4'}
                    github={'https://github.com/alexeyandreevsky'}
                    discord={'https://discordapp.com/users/390865069195657216'}
                />

            </div>

        </div>
    )
}

export default Team