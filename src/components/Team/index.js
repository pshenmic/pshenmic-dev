import { motion as m } from 'framer-motion'
import { useCallback } from 'react'
import Teammate from './Teammate'
import ActionButtons from '../UI/Button/ActionButtons/ActionButtons'
import useGlobalStore from '@/store/store'
import './Team.scss'

function Team() {
  const setOpenEditingWindow = useGlobalStore(state => state.setOpenEditingWindow)
  const admin = useGlobalStore(state => state.admin)

  const openEditingWindow = useCallback(() => {
    setOpenEditingWindow(true)
  }, [])

  return (
    <m.div className={'Team'}>
      <div className={'Team__TeammateList'}>
        <Teammate
          id={1}
          name={'Mikhail'}
          username={'pshenmic'}
          role={'Lead / Coder'}
          gpg={'A0CE DD79 11C6 3ACB 60D3  8648 9468 3166 E328 0A61'}
          photoSrc={'https://avatars.githubusercontent.com/u/17009187?v=4'}
          github={'https://github.com/pshenmic'}
          twitter={'https://twitter.com/pshenmic'}
          discord={'https://discordapp.com/users/784071440864378911'}
          handleClick={openEditingWindow}
        />

        <Teammate
          id={2}
          name={'Alex'}
          username={'alexeyandreevsky'}
          role={'Frontend dev'}
          photoSrc={'https://avatars.githubusercontent.com/u/143793672?v=4'}
          github={'https://github.com/alexeyandreevsky'}
          discord={'https://discordapp.com/users/390865069195657216'}
          handleClick={openEditingWindow}
        />

        <Teammate
          id={2}
          name={'Owl352'}
          username={'owl352'}
          role={'Backend dev'}
          photoSrc={'https://avatars.githubusercontent.com/u/64574305?v=4'}
          github={'https://github.com/owl352'}
          discord={'https://discordapp.com/users/489364520251162627'}
          handleClick={openEditingWindow}
        />

        <Teammate
          id={2}
          name={'Designer'}
          username={'designer'}
          role={'UX designer'}
          photoSrc={'https://avatars.githubusercontent.com/u/91994843?v=4'}
          github={'https://github.com/blackmirrordesigner'}
          discord={'https://discordapp.com/users/593372910794571776'}
          handleClick={openEditingWindow}
        />

        <Teammate
          id={2}
          name={'Den Kravchu'}
          username={'designer'}
          role={'Frontend dev'}
          photoSrc={'https://avatars.githubusercontent.com/u/58281610?v=4'}
          github={'https://github.com/denkravchu'}
          discord={'https://discordapp.com/users/926201806487437352'}
          handleClick={openEditingWindow}
        />
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
