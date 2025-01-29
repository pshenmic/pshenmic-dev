'use client'

import './App.scss'
import Menu from '../components/Menu'
import CommandLine from '../components/CommandLine/CommandLine'
import dynamic from 'next/dynamic'
import ContentBlock from '@/components/ContentBlock/ContentBlock'
import { usePathname } from 'next/navigation'
import { BrowserRouter as Router } from 'react-router-dom'
import { motion as m } from 'framer-motion'
import { useState, useEffect } from 'react'

const GetZeroClient = dynamic(() => import('@/components/GetZeroClient/GetZeroClient'), { ssr: false });

const defaultContent = 'updates'

export default function App() {
  const [content, setContent] = useState(defaultContent)
  const [render, setRender] = useState(false)
  const path = usePathname()

  useEffect(() => {
    const pathArray = window.location.pathname.split('/').slice(1)
    setRender(true)
    setContent(pathArray[0] !== '' ? pathArray[0] : defaultContent)
  }, [])

  return render
    ? <Router>
      <GetZeroClient />
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
