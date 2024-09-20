import Post from './Post.js'
import { PostTypeEnum } from '@/enums/postTypeEnum'
import { useMemo } from 'react'
import './Updates.scss'

const posts = [
  {
    content: 'Validators finally arrived on the Platform Explorer. You can see active masternodes and their proposed blocks.',
    imgSrc: '/assets/img/pe_validators.jpg',
    externalLink: 'https://platform-explorer.com/validators',
    type: PostTypeEnum.STATIC,
    date: '08.07.2024'
  },
  {
    content: 'Platform Explorer Data Contract deployed to the testnet. <br><br>You can push a custom data contract name alias for the Platform Explorer to make your data contracts in the Network more recognizable.',
    imgSrc: '',
    externalLink: 'https://platform-explorer.com',
    type: PostTypeEnum.STATIC,
    date: '17.06.2024'
  },
  {
    content: 'PE frontend interface implemented an async data loading and now it shows a nice loader when is being fetched. <br><br>In case there are any errors during requests, user see a common error message',
    imgSrc: '',
    externalLink: 'https://platform-explorer.com',
    type: PostTypeEnum.STATIC,
    date: '06.06.2024'
  },
  {
    content: 'Platform Explorer interface received a huge homepage redesign that now introduces trending lists block and transactions chart! <br><br>Network status block has been also revamped and now clearly shows when network or API is down.',
    imgSrc: '',
    externalLink: 'https://platform-explorer.com',
    type: PostTypeEnum.STATIC,
    date: '06.06.2024'
  },
  {
    content: 'Platform Explorer frontend has been moved to the NextJS framework. Server side rendering will allow website to increase page load speed and also increase rank in the search engines like Google.',
    imgSrc: '',
    externalLink: 'https://platform-explorer.com',
    type: PostTypeEnum.STATIC,
    date: '18.03.2024'
  },
  {
    content: 'Platform Explorer backend layer was fully covered with integration tests which ensures it\'s stability and correctness of the API reposnse. <br><br> We also added a separate documentation page, where you can see a public API to use in your projects',
    imgSrc: '',
    externalLink: 'https://platform-explorer.com',
    type: PostTypeEnum.STATIC,
    date: '14.03.2024'
  },
  {
    content: 'Electrum Dash 4.1.7.4 stable release is out. Build includes working PrivateSend for Linux, Mac and Windows. https://github.com/pshenmic/electrum-dash/releases/tag/4.1.7.4',
    imgSrc: '',
    externalLink: '',
    type: PostTypeEnum.STATIC,
    date: '30.01.2024'
  },
  {
    content: 'Electrum Dash release candidate build is out with PrivateSend support back in the game. Feel free to test and report any bugs! https://github.com/pshenmic/electrum-dash/releases/tag/4.1.7.4-rc.9',
    imgSrc: '',
    externalLink: 'https://twitter.com/pshenmic/status/1747739859605709104',
    type: PostTypeEnum.TWITTER,
    date: '18.01.2024'
  },
  {
    content: 'Electrum Dash wallet almost recovered PrivateSend support! New stable build is coming out soon in next few days! 🤙',
    imgSrc: '',
    externalLink: 'https://twitter.com/pshenmic/status/1746916402525552735',
    type: PostTypeEnum.TWITTER,
    date: '15.01.2024'
  },
  {
    content: 'Electrum Dash just have upgraded to Python 3.10',
    imgSrc: '',
    externalLink: 'https://twitter.com/pshenmic/status/1737533844197126375',
    date: '21.12.2024',
    type: PostTypeEnum.TWITTER
  },
  {
    content: 'How to install Dashmate on Ubuntu',
    imgSrc: 'https://img.youtube.com/vi/' + '_aQF46s12HI' + '/0.jpg',
    externalLink: 'https://www.youtube.com/watch?v=_aQF46s12HI',
    date: '21.11.2023',
    type: PostTypeEnum.YOUTUBE
  }
]

function Updates () {
  const ListItems = useMemo(() => posts.map((post, id) =>
    <Post key={'post' + id} post = {post} id={id}/>
  ), [posts])

  return (
    <div className={'Devspace'}>
      {ListItems}
    </div>
  )
}

export default Updates
