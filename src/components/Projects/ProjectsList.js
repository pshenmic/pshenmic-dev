import { useCallback, useEffect, useState } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ProjectListItem from './ProjectListItem'
import Project from './Project'
import useGlobalStore from '@/store/store'
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
import './ProjectsList.scss'
import LoadingDots from '../UI/Loading/LoadingDots'
import ProjectListItemSkeleton from './ProjectListItemSkeleton'

export default function ProjectsList() {
  const [openedItem, setOpenedItem] = useState(null)
  const admin = useGlobalStore(state => state.admin)
  const setOpenEditingWindow = useGlobalStore(state => state.setOpenEditingWindow)
  const client = useGlobalStore(state => state.client)
  const [documents, setDocuments] = useState([])
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [uniqueIds] = useState(new Set());
  const [lastDocument, setLastDocument] = useState(null);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
    triggerOnce: false
  });

  console.log('documents', documents)

  const loadMoreDocuments = useCallback(async () => {
    if (isLoading || !hasMore) { return }
    setIsLoading(true)

    try {
      const queryOpts = {
        limit: 5,
        where: [],
        orderBy: [['$id', 'asc']]
      };

      if (lastDocument) {
        queryOpts.startAfter = lastDocument.getId().toBuffer()
      }

      const response = await client.platform.documents.get(
        'pshenmic-dev-dfo.Project',
        queryOpts
      )

      if (response && response.length > 0) {
        setLastDocument(response[response.length - 1])

        const uniqueDocuments = response.filter(doc => {
          const id = doc.getId().toString()
          if (uniqueIds.has(id)) return false
          uniqueIds.add(id)
          return true
        })

        if (uniqueDocuments.length > 0) {
          const newDocuments = uniqueDocuments.map(doc => ({
            ...doc.getData(),
            id: doc.getId().toString()
          }))

          setDocuments(prev => [...prev, ...newDocuments])
          setHasMore(response.length >= queryOpts.limit)
        }
      } else {
        setHasMore(false);
      }

    } catch (error) {
      console.error('Error loading documents:', error)
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, hasMore, lastDocument, uniqueIds]);


  useEffect(() => {
    if (client?.platform?.documents) {
      loadMoreDocuments()
    }
  }, []);

  useEffect(() => {
    if (inView && !isLoading && hasMore) {
      loadMoreDocuments()
    }
  }, [inView, isLoading, hasMore, loadMoreDocuments])

  const openEditingWindow = useCallback(() => {
    setOpenEditingWindow(true)
  }, [setOpenEditingWindow])

  const ListItems = documents.map((project, id) =>
    <ProjectListItem
      key={project.id}
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
            project={documents[openedItem]}
            closeHandler={() => setOpenedItem(null)}
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
                handleClick={openEditingWindow}
                style={{
                  background: '#0275ff',
                  textTransform: 'capitalize',
                }}
              />
            )}
          </div>
          <ul>
            {ListItems}
            {hasMore && (
              <div
                ref={ref}
                style={{
                  height: '1px',
                  width: '100%',
                }}
              >
                {isLoading ?
                  <>
                    <ProjectListItemSkeleton />
                    <ProjectListItemSkeleton />
                    <ProjectListItemSkeleton />
                    <ProjectListItemSkeleton />
                    <ProjectListItemSkeleton />
                  </>
                  : null}
              </div>
            )}
          </ul>
        </m.div>
      )}
    </AnimatePresence>
  )
}
