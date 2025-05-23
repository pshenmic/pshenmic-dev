import { motion as m } from 'framer-motion'
import { useCallback } from 'react'
import Teammate from './Teammate'
import ActionButtons from '../UI/Button/ActionButtons/ActionButtons'
import useGlobalStore from '@/store/store'
import './Team.scss'

const data = [
  {
    name: 'Mikhail',
    username: 'pshenmic',
    role: 'Lead / Coder',
    gpg: {
      message: 'A0CE DD79 11C6 3ACB 60D3  8648 9468 3166 E328 0A61',
      link: 'https://keys.openpgp.org/vks/v1/by-fingerprint/A0CEDD7911C63ACB60D3864894683166E3280A61'
    },
    photoSrc: 'https://avatars.githubusercontent.com/u/17009187?v=4',
    github: 'https://github.com/pshenmic',
    twitter: 'https://twitter.com/pshenmic',
    discord: 'https://discordapp.com/users/784071440864378911'
  },
  {
    name: 'Alexey',
    username: 'AlexeyTripleA',
    role: 'Frontend dev',
    gpg: null,
    photoSrc: 'https://avatars.githubusercontent.com/u/143793672?v=4',
    github: 'https://github.com/AlexeyTripleA',
    twitter: 'https://x.com/AlexeyTripleA',
    discord: 'https://discordapp.com/users/390865069195657216'
  },
  {
    name: 'Owl352',
    username: 'owl352',
    role: 'Backend dev',
    gpg: null,
    photoSrc: 'https://avatars.githubusercontent.com/u/64574305?v=4',
    github: 'https://github.com/owl352',
    twitter: '',
    discord: 'https://discordapp.com/users/489364520251162627'
  },
  {
    name: 'Black Mirror Designer',
    username: 'blackmirrordesigner',
    role: 'UX designer',
    gpg: null,
    photoSrc: '/assets/designer-avatar.png',
    github: 'https://github.com/blackmirrordesigner',
    twitter: '',
    discord: 'https://discordapp.com/users/593372910794571776'
  },
  {
    name: 'Den Kravchu',
    username: 'denkravchu',
    role: 'Frontend dev',
    gpg: null,
    photoSrc: 'https://avatars.githubusercontent.com/u/58281610?v=4',
    github: 'https://github.com/denkravchu',
    twitter: '',
    discord: 'https://discordapp.com/users/926201806487437352'
  },
  {
    name: 'Alexey Yakushin',
    username: 'LexxXell',
    role: 'Fullstack developer',
    gpg: null,
    photoSrc: 'https://avatars.githubusercontent.com/u/49353940',
    github: 'https://github.com/lexxxell',
    twitter: '',
    discord: 'https://discordapp.com/users/612308392307851280'
  }
]

function Team () {
  const setOpenEditingWindow = useGlobalStore(state => state.setOpenEditingWindow)
  const admin = useGlobalStore(state => state.admin)

  const openEditingWindow = useCallback(() => {
    setOpenEditingWindow(true)
  }, [])

  return (
    <m.div className={'Team'}>
      <div className={'Team__TeammateList'}>
        {data.map((_, idx) => (
          <Teammate
            key={idx}
            id={idx}
            name={_.name}
            username={_.username}
            role={_.role}
            gpg={_.pg}
            photoSrc={_.photoSrc}
            github={_.github}
            discord={_.discord}
            twitter={_.twitter}
            handleClick={openEditingWindow}
          />
        ))}
      </div>
      {admin
        ? <ActionButtons
          text={'Add to the team'}
          ariaLabel={'Add to the team'}
          handleClick={openEditingWindow}
        />
        : null}
    </m.div>
  )
}

export default Team
