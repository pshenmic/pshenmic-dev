import { useCallback, useMemo, useState } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import ProjectListItem from './ProjectListItem'
import Project from './Project'
import useGlobalStore from '@/store/store'
import Pagination from '../UI/Pagination/Pagination'
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
import './ProjectsList.scss'

const defaultProjectsList = [
  {
    title: 'Electrum Dash',
    description: 'A lightweight wallet for a Desktops & Android allow you to receive and spend Dash anywhere without downloading the blockchain with a PrivateSend support.',
    imgSrc: '/assets/img/dash-electrum-icon.png',
    githubLink: '',
    projectLink: 'http://dash-electrum.org/',
    dashmate: 'dash-electrum.com',
    tasts: ['test', 'test2', 'test3'],
    pendingClaims: ['test', 'test2', 'test3'],
  },
  {
    title: 'Platform Explorer',
    description: 'Block explorer for a brand new Dash Platform chain. Explore latest Dash Evolution data such as Identities, Data Contracts, and Documents.',
    imgSrc: '/assets/img/platform-explorer-preview-300x300.jpg',
    githubLink: 'https://github.com/pshenmic/platform-explorer',
    projectLink: 'https://platform-explorer.com/',
    dashmate: 'dash-electrum.com',
    tasts: ['test', 'test2', 'test3'],
    pendingClaims: ['test', 'test2', 'test3'],
  },
  {
    title: 'Dashmate Contribution',
    description: 'Masternode setup tool that drastically eases node configuration and setup with a nice & easy CLI interface. Built on top of Node.Js and Docker.',
    imgSrc: '/assets/img/dashmate-preview-300x300.jpg',
    githubLink: 'https://github.com/dashpay/platform/tree/master/packages/dashmate',
    projectLink: 'https://www.dashmate.org/',
    dashmate: 'dash-electrum.com',
    tasts: ['test', 'test2', 'test3'],
    pendingClaims: ['test', 'test2', 'test3'],
  },
  {
    title: 'Dashboards',
    description: 'Monitoring toolset that keeps track of the current state of the services deployed in the pshenmic cloud. Ensure yourself the SLA and stability of the provided services or be first to notice the fatal issues happening in cloud or blockchain network!',
    imgSrc: '/assets/img/dashboards-preview-400x400.png',
    githubLink: '',
    projectLink: 'https://dashboards.pshenmic.dev/',
    dashmate: 'dash-electrum.com',
    tasts: ['test', 'test2', 'test3'],
    pendingClaims: ['test', 'test2', 'test3'],
  },
  //

  {
    title: 'Dashmate Contribution',
    description: 'Masternode setup tool that drastically eases node configuration and setup with a nice & easy CLI interface. Built on top of Node.Js and Docker.',
    imgSrc: '/assets/img/dashmate-preview-300x300.jpg',
    githubLink: 'https://github.com/dashpay/platform/tree/master/packages/dashmate',
    projectLink: 'https://www.dashmate.org/',
    dashmate: 'dash-electrum.com',
    tasts: ['test', 'test2', 'test3'],
    pendingClaims: ['test', 'test2', 'test3'],
  },
  {
    title: 'Dashboards',
    description: 'Monitoring toolset that keeps track of the current state of the services deployed in the pshenmic cloud. Ensure yourself the SLA and stability of the provided services or be first to notice the fatal issues happening in cloud or blockchain network!',
    imgSrc: '/assets/img/dashboards-preview-400x400.png',
    githubLink: '',
    projectLink: 'https://dashboards.pshenmic.dev/',
    dashmate: 'dash-electrum.com',
    tasts: ['test', 'test2', 'test3'],
    pendingClaims: ['test', 'test2', 'test3'],
  },
  {
    title: 'Dashmate Contribution',
    description: 'Masternode setup tool that drastically eases node configuration and setup with a nice & easy CLI interface. Built on top of Node.Js and Docker.',
    imgSrc: '/assets/img/dashmate-preview-300x300.jpg',
    githubLink: 'https://github.com/dashpay/platform/tree/master/packages/dashmate',
    projectLink: 'https://www.dashmate.org/',
    dashmate: 'dash-electrum.com',
    tasts: ['test', 'test2', 'test3'],
    pendingClaims: ['test', 'test2', 'test3'],
  },
  {
    title: 'Dashboards',
    description: 'Monitoring toolset that keeps track of the current state of the services deployed in the pshenmic cloud. Ensure yourself the SLA and stability of the provided services or be first to notice the fatal issues happening in cloud or blockchain network!',
    imgSrc: '/assets/img/dashboards-preview-400x400.png',
    githubLink: '',
    projectLink: 'https://dashboards.pshenmic.dev/',
    dashmate: 'dash-electrum.com',
    tasts: [],
    pendingClaims: ['test', 'test2', 'test3'],
  },
  {
    title: 'Dashmate Contribution',
    description: 'Masternode setup tool that drastically eases node configuration and setup with a nice & easy CLI interface. Built on top of Node.Js and Docker.',
    imgSrc: '/assets/img/dashmate-preview-300x300.jpg',
    githubLink: 'https://github.com/dashpay/platform/tree/master/packages/dashmate',
    projectLink: 'https://www.dashmate.org/',
    dashmate: 'dash-electrum.com',
    tasts: ['test', 'test2', 'test3'],
    pendingClaims: ['test', 'test2', 'test3'],
  },
  {
    title: 'Dashboards',
    description: 'Monitoring toolset that keeps track of the current state of the services deployed in the pshenmic cloud. Ensure yourself the SLA and stability of the provided services or be first to notice the fatal issues happening in cloud or blockchain network!',
    imgSrc: '/assets/img/dashboards-preview-400x400.png',
    githubLink: '',
    projectLink: 'https://dashboards.pshenmic.dev/',
    dashmate: 'dash-electrum.com',
    tasts: ['test', 'test2', 'test3'],
    pendingClaims: ['test', 'test2', 'test3'],
  }
]

export default function ProjectsList({ projects = defaultProjectsList }) {
  const [openedItem, setOpenedItem] = useState(null)
  const admin = useGlobalStore(state => state.admin)
  const setAdmin = useGlobalStore(state => state.setAdmin)
  const setOpenEditingWindow = useGlobalStore(state => state.setOpenEditingWindow)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  setAdmin(true)
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const currentProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return projects.slice(startIndex, endIndex);
  }, [projects, currentPage, itemsPerPage]);

  const openEditingWindow = useCallback(() => {
    setOpenEditingWindow(true)
  }, [setOpenEditingWindow])

  const ListItems = currentProjects.map((project, id) =>
    <ProjectListItem
      key={'project' + id}
      id={id}
      project={project}
      hidden={openedItem !== null && openedItem !== id}
      openHandler={() => setOpenedItem(id)}
      openEditor={openEditingWindow}
    />
  )

  return (
    <AnimatePresence mode={'wait'}>
      {openedItem !== null && (
        <m.div key={'project'}>
          <Project
            project={projects[openedItem]}
            closeHandler={() => setOpenedItem(null)}
          />
        </m.div>
      )}

      {openedItem === null && (
        <m.div key={'projectsList'} className={'ProjectsList'}>
          <div className={'ProjectsList__Header'}>
            <h2>Projects</h2>
            {admin && openedItem === null
              ? <RegistrationButton
                text={'New Project'}
                ariaLabel={'add Project '}
                handleClick={openEditingWindow}
                style={{
                  background: '#0275ff',
                  textTransform: 'capitalize',
                }}
              />
              : null}
          </div>
          <ul>
            {ListItems}
          </ul>
          <Pagination
            totalItems={projects.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </m.div>
      )}
    </AnimatePresence>
  )
}
