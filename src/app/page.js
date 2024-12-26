'use client'

import './App.scss'
import { useState, useEffect } from 'react'
import Menu from '../components/Menu'
import CommandLine from '../components/CommandLine/CommandLine'
import { motion as m } from 'framer-motion'
import { BrowserRouter as Router } from 'react-router-dom'
import ContentBlock from '@/components/ContentBlock/ContentBlock'
import { usePathname } from 'next/navigation'
import useGlobalStore from '@/store/store'
import Dash from "dash";
const defaultContent = 'updates'

export default function App() {

  useEffect(() => {
    const addClient = async () => {
      const clientOpts = {
        network: 'testnet',
        apps: {
          tutorialContract: {
            contractId: '2MfmHqYmAk1jAQNv7SsGJPT22MrfKFcHKZDc7cTu2biX',
          },
        },
      };
      const client = new Dash.Client(clientOpts);
      console.log('client', client)
      // const documents = await client.platform.documents.get('dpns.domain', {
      //   limit: 100,
      //   offset: 0,
      // });
      // console.log('documents', documents)
    }
    addClient()
  }, [])

  const [content, setContent] = useState(defaultContent)
  const [render, setRender] = useState(false)
  const path = usePathname()
  const setOpenAdminAccessPopup = useGlobalStore(state => state.setOpenAdminAccessPopup)
  const openAdminAccessPopup = useGlobalStore(state => state.openAdminAccessPopup)
  const setAdmin = useGlobalStore(state => state.setAdmin)

  useEffect(() => {
    const hasAdminAccess = localStorage.getItem('isAdminPshenmic')
    const isAdminPath = path.includes('admin')
    setOpenAdminAccessPopup(isAdminPath && !hasAdminAccess)
    setAdmin(isAdminPath && !!hasAdminAccess)
  }, [path, openAdminAccessPopup])

  useEffect(() => {
    // removal of administrator access
    const dataClear = localStorage.getItem('dataClear')
    const now = new Date()
    // localStorage.clear()
    if (dataClear && now.getTime() >= dataClear) {
      localStorage.clear()
    }

    const pathArray = window.location.pathname.split('/').slice(1)
    setRender(true)
    setContent(pathArray[0] !== '' ? pathArray[0] : defaultContent)
  }, [])

  return render
    ? <Router>
      <main className={'App'}>
        <m.div className={'App__CommonWrapper'}>
          <div className={'App__Sidebar'}>
            <Menu selectItemCallback={setContent} defaultItem={content} />
            {path.includes('admin')
              ? null
              : <CommandLine category={content} />
            }
          </div>
          <ContentBlock />
        </m.div>
      </main>
    </Router>
    : null
}
