import { motion as m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import useGlobalStore from '@/store/store'
import EditButton from '../UI/Button/EditButton/EditButton'
import './Teammate.scss'

function Teammate ({ name, username, role, photoSrc, discord, github, twitter, id, handleClick }) {
  const admin = useGlobalStore(state => state.admin)

  return (
    <m.div
      className={'Teammate'}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{
        x: -5,
        y: -5,
        transition: { duration: 0.5 }
      }}
      transition={{ duration: 0.5, delay: id / 10 }}
    >
      { admin ?
        <div className={'Teammate__WrapperEditButton'}>
          <EditButton handleClick={handleClick}/>
        </div>
      : null }
      <div className={'Teammate__ImageContainer'}>
        <Image alt={name || ''} src={photoSrc} width={300} height={300}/>
      </div>

      <div className={'Teammate__ContentContainer'}>
        <div className={'Teammate__Title'}>
          <div className={'Teammate__Name'}>{name}</div>
          <div className={'Teammate__Username'}>@{username}</div>
        </div>

        <div className={'Teammate__Description'}>{role}</div>

        <div className={'Teammate__Socials'}>
          {(github &&
            <Link
              href={github}
              target={'_blank'}
              className={'Teammate__SocialLink Teammate__SocialLink--Github'}>
            </Link>
          )}

          {(discord &&
            <Link
              href={discord}
              target={'_blank'}
              className={'Teammate__SocialLink Teammate__SocialLink--Discord'}>
            </Link>
          )}

          {(twitter &&
            <Link
              href={twitter}
              className={'Teammate__SocialLink Teammate__SocialLink--Twitter'}>
            </Link>
          )}
        </div>
      </div>
    </m.div>
  )
}

export default Teammate
