'use client'

import './App.scss'
import Menu from '../components/Menu'
import CommandLine from '../components/CommandLine/CommandLine'
import ContentBlock from '@/components/ContentBlock/ContentBlock'
import useGlobalStore from '@/store/store'
import Dash from "dash";
import { showToast } from '@/lib/showToast'
import { usePathname } from 'next/navigation'
import { BrowserRouter as Router } from 'react-router-dom'
import { motion as m } from 'framer-motion'
import { useState, useEffect } from 'react'

const defaultContent = 'updates'

export default function App() {
  const { setClient } = useGlobalStore();
  const [content, setContent] = useState(defaultContent)
  const [render, setRender] = useState(false)
  const path = usePathname()

  // adding a zero client
  // useEffect(() => {
  //   const addClient = async () => {
  //     try {
  //       const clientOpts = {
  //         network: 'testnet',
  //         apps: {
  //           tutorialContract: {
  //             contractId: process.env.NEXT_PUBLIC_INITIAL_CLIENT,
  //           },
  //           "pshenmic-dev-dfo": {
  //             contractId: process.env.NEXT_PUBLIC_CONTRACT_ID,
  //           },
  //         },
  //         wallet: {
  //           skipSynchronizationBeforeHeight: 1,
  //           offlineMode: true,
  //         },
  //       };
  //       const client = new Dash.Client(clientOpts);
        
  //       if (client) {
  //         setClient(client)
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //       showToast('error', 'Error logging in, try again later');
  //     }
  //   }
  //   addClient()
  // }, [])

  useEffect(() => {
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
