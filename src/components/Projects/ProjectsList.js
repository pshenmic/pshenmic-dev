'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ProjectListItem from './ProjectListItem'
import useGlobalStore from '@/store/store'
import RegistrationButton from '../UI/Button/RegistrationButton/RegistrationButton'
import ProjectListItemSkeleton from './ProjectListItemSkeleton'
import dynamic from 'next/dynamic'
import './ProjectsList.scss'

const Project = dynamic( () => import('./Project').then(mod => mod.default),{ ssr: false });

export default function ProjectsList() {
  const [openedItem, setOpenedItem] = useState(null)
  const admin = useGlobalStore(state => state.admin)
  const client = useGlobalStore(state => state.client)
  const setOpenEditingWindow = useGlobalStore(state => state.setOpenEditingWindow)
  const setProjectDataEditing = useGlobalStore(state => state.setProjectDataEditing)
  const [documents, setDocuments] = useState([])
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [uniqueIds] = useState(new Set());
  const [lastDocument, setLastDocument] = useState(null);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '50px',
    triggerOnce: false
  });

  const loadMoreDocuments = useCallback(async () => {
    if (isLoading || !hasMore || !client || !client.platform) { return }
    setIsLoading(true)

    try {
      const queryOpts = {
        limit: 10,
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
          const newDocuments = await Promise.all(uniqueDocuments.map(async doc => {
            const ownerId = doc.getOwnerId().toString();
            // console.log('doc', doc.getDocument().getRevision())
            console.log('doc', doc)
            // console.log('docget', doc.get())
            // console.log('getDocument', doc.getDocument().get())
            console.log('getType', doc.toJSON())

            // const metadata = doc.getMetadata();
            // console.log('Document metadata:', metadata);
            // console.log('Is deleted:', metadata.isDeleted());
            try {
              const nameDoc = await client.platform.documents.get(
                'dpns.domain',
                {
                  where: [
                    ['records.identity', '==', ownerId],
                  ],
                }
              );

              const ownerName = nameDoc.length > 0 ? nameDoc[0].getData().label : null;

              console.log('ownerName', ownerName)

              return {
                ...doc.getData(),
                id: doc.getId().toString(),
                ownerId,
                ownerName
              };
            } catch (nameError) {
              console.error('Error fetching name:', nameError);
              return {
                ...doc.getData(),
                id: doc.getId().toString(),
                ownerId,
                ownerName: null
              };
            }
          }));

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
    loadMoreDocuments()
  }, []);

  useEffect(() => {
    if (inView && !isLoading && hasMore) {
      loadMoreDocuments()
    }
  }, [inView, isLoading, hasMore, loadMoreDocuments])

  console.log(documents)

  const openEditor = useCallback((project) => {
    setOpenEditingWindow(true)
    let projectData = {
      name_ProjectEditingWindow: project?.name || '',
      description_ProjectEditingWindow: project?.description || '',
      url_ProjectEditingWindow: project?.url || '',
      id: project?.id || '',
    }
    setProjectDataEditing(projectData)
  }, [setOpenEditingWindow, setProjectDataEditing])

  const ListItems = documents.map((project, id) =>
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
