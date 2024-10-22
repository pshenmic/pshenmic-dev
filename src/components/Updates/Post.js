import Link from 'next/link'
import Image from 'next/image'
import useGlobalStore from '@/store/store'
import EditButton from '../UI/Button/EditButton/EditButton'
import { motion as m } from 'framer-motion'
import { PostTypeEnum } from '../../enums/postTypeEnum'
import './Post.scss'

function Post ({ post, id, handleClick }) {
  const admin = useGlobalStore(state => state.admin)

  const postClassMapping = {
    [PostTypeEnum.STATIC]: 'Post Post--static',
    [PostTypeEnum.TWITTER]: 'Post Post--twitter',
    [PostTypeEnum.YOUTUBE]: 'Post Post--youtube'
  }

  const ContentWrapper = ({ children }) => {
    if (!post.externalLink) {
      return <div className={'Post__ContentWrapper'}>{children}</div>
    }

    return (
      <Link
        href={post.externalLink}
        className={'Post__ContentWrapper'}
        target={'_blank'}
      >
        {children}
      </Link>
    )
  }

  return (
    <m.div
      className={postClassMapping[post.type]}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{
        x: -5,
        y: -5,
        transition: { duration: 0.5 }
      }}
      transition={{ duration: 0.5, delay: id / 10 }}
    >
      {admin
        ? <div className={'Post__WrapperEditButton'}>
          <EditButton handleClick={handleClick}/>
        </div>
        : null}
      <ContentWrapper>
        {(post.imgSrc &&
          <div className={'Post__ImageContainer'}>
            <Image alt={''} src={post.imgSrc} width={300} height={300}/>
          </div>
        )}
        <div className={'Post__ContentContainer'}>
          <div
            className={'Post__Content'}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <small>{ post.date }</small>
        </div>
      </ContentWrapper>
    </m.div>
  )
}

export default Post
