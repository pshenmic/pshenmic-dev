'use client'

import { useCallback, useState } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
// import { useInView } from 'react-intersection-observer'
import ProjectListItem from './ProjectListItem'
import useGlobalStore from '@/store/store'
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
// import ProjectListItemSkeleton from './ProjectListItemSkeleton'
import dynamic from 'next/dynamic'
import './ProjectsList.scss'

const Project = dynamic(() => import('./Project').then(mod => mod.default), { ssr: false });

const documents = [
  {
    id: 'platform-explorer',
    name: 'Platform Explorer',
    description: 'A comprehensive blockchain explorer for Dash Platform',
    url: 'https://platform-explorer.com/',
    image: '/assets/img/pe-screen-300x300.jpg',
  },
  {
    id: 'dash-platform-extension',
    name: 'Dash Platform Extension',
    description: 'A browser extension wallet for interacting with Dash Platform blockchain\n' +
      'The Dash Platform Extension is a powerful Web3 wallet specifically designed for the Dash Platform ecosystem. Whether you\'re a crypto enthusiast managing digital assets or a developer building the next generation of decentralized applications, this extension provides all the tools you need in one secure, user-friendly package.',
    url: 'https://chromewebstore.google.com/detail/dash-platform-extension/odmphbcnlldggfhcpdjgnlhbehoicdnf',
    image: '/assets/img/dash-300x300.jpg'
  },
  {
    id: 'dash-platform-sdk',
    name: 'Dash Platform Sdk',
    description: 'A lightweight Javascript Dash Platform SDK',
    url: 'https://github.com/pshenmic/dash-platform-sdk',
    image: '/assets/img/dash-300x300.jpg'
  }
];

export default function ProjectsList() {
  const [openedItem, setOpenedItem] = useState(null)
  // const [isLoading, setIsLoading] = useState(false);
  // const [uniqueIds, setUniqueIds] = useState(new Set());
  // const [lastDocument, setLastDocument] = useState(null);
  const { admin, setOpenEditingWindow, setProjectDataEditing } = useGlobalStore();
  // const [documents, setDocuments] = useState(MOCK_PROJECTS);
  // const hasMore = false;

  // const { ref, inView } = useInView({
  //   threshold: 0,
  //   rootMargin: '50px',
  //   triggerOnce: false
  // });

  // const loadMoreDocuments = useCallback(async () => {
  //   if (isLoading || !hasMore || !client || !client?.platform?.documents) { return }
  //   setIsLoading(true)

  //   try {
  //     const queryOpts = {
  //       limit: 10,
  //       where: [],
  //       orderBy: [['$id', 'asc']]
  //     };

  //     if (lastDocument) {
  //       queryOpts.startAfter = lastDocument.getId().toBuffer()
  //     }

  //     const response = await client.platform.documents.get(
  //       'pshenmic-dev-dfo.Project',
  //       queryOpts
  //     )
  //     if (response && response.length > 0) {
  //       setLastDocument(response[response.length - 1])
  //       const newUniqueIds = new Set(uniqueIds);
  //       const uniqueDocuments = response.filter(doc => {
  //         const id = doc.getId().toString()
  //         if (newUniqueIds.has(id)) return false
  //         newUniqueIds.add(id)
  //         return true
  //       })

  //       setUniqueIds(newUniqueIds);

  //       if (uniqueDocuments.length > 0) {
  //         const newDocuments = await Promise.all(uniqueDocuments.map(async doc => {
  //           const ownerId = doc.getOwnerId().toString();
  //           try {
  //             const nameDoc = await client.platform.documents.get(
  //               'dpns.domain',
  //               {
  //                 where: [
  //                   ['records.identity', '==', ownerId],
  //                 ],
  //               }
  //             );

  //             const ownerName = nameDoc.length > 0 ? nameDoc[0].getData().label : null;

  //             return {
  //               ...doc.getData(),
  //               id: doc.getId().toString(),
  //               ownerId,
  //               ownerName
  //             }
  //           } catch (nameError) {
  //             console.error('Error fetching name:', nameError);
  //             return {
  //               ...doc.getData(),
  //               id: doc.getId().toString(),
  //               ownerId,
  //               ownerName: null
  //             };
  //           }
  //         }));

  //         if (newDocuments) {
  //           const newDocs = [...documents, ...newDocuments]
  //           setDocuments(newDocs)
  //         }
        
  //         setHasMore(response.length >= queryOpts.limit)
  //       }
  //     } else {
  //       setHasMore(false);
  //     }

  //   } catch (error) {
  //     console.error('Error loading documents:', error)
  //     setHasMore(false)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }, [isLoading, hasMore, lastDocument, uniqueIds, client]);

  // useEffect(() => {
  //   const resetState = () => {
  //     setHasMore(true);
  //     setDocuments([]);
  //     setLastDocument(null);
  //     setUniqueIds(new Set());
  //   };

  //   resetState();

  //   if (client?.platform) {
  //     loadMoreDocuments();
  //   }

  //   return () => {
  //     resetState();
  //   };
  // }, [client]);

  // useEffect(() => {
  //   if (inView && !isLoading && hasMore) {
  //     loadMoreDocuments()
  //   }
  // }, [inView, isLoading, hasMore, loadMoreDocuments])

  const openEditor = useCallback((project) => {
    setOpenEditingWindow(true)
    let projectData = {
      name_ProjectEditingWindow: project?.name || '',
      description_ProjectEditingWindow: project?.description || '',
      url_ProjectEditingWindow: project?.url || '',
      id: project?.id || '',
      image_ProjectEditingWindow: project?.image || '',
    }
    setProjectDataEditing(projectData)
  }, [setOpenEditingWindow, setProjectDataEditing])

  const ListItems = documents?.map((project, id) =>
    <ProjectListItem
      key={project.id}
      id={id}
      project={project}
      hidden={openedItem !== null && openedItem !== id}
      openHandler={() => setOpenedItem(id)}
      openEditor={openEditor}
    />
  )

  return (
    <AnimatePresence mode={'wait'}>
      {openedItem !== null && (
        <m.div key={'project'}>
          <Project
            project={documents[openedItem]}
            closeHandler={() => setOpenedItem(null)}
            openEditor={openEditor}
          />
        </m.div>
      )}

      {openedItem === null && (
        <m.div key={'projectsList'} className={'ProjectsList'}>
          <div className={'ProjectsList__Header'}>
            <h2>Projects</h2>
            {admin && openedItem === null && (
              <RegistrationButton
                text={'New Project'}
                ariaLabel={'add Project'}
                handleClick={() => setOpenEditingWindow(true)}
                style={{
                  background: '#0275ff',
                  textTransform: 'capitalize',
                }}
              />
            )}
          </div>
          <ul>
            {ListItems}
            {/* {hasMore && (
              <>
                <div
                  ref={ref}
                  style={{
                    height: '1px',
                    width: '100%',
                  }}
                >
                </div>
                {!documents.length ?
                  <>
                    <ProjectListItemSkeleton />
                    <ProjectListItemSkeleton />
                    <ProjectListItemSkeleton />
                    <ProjectListItemSkeleton />
                    <ProjectListItemSkeleton />
                  </>
                  : null}
              </>
            )} */}
          </ul>
        </m.div>
      )}
    </AnimatePresence>
  )
}
