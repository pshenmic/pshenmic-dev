"use client";

import './App.scss'
import { useState } from 'react';
import Menu from '../components/Menu'
import CommandLine from '../components/CommandLine/CommandLine'
import Devspace from '../components/Devspace'
import ServicesList from '../components/Services/ServicesList'
import ProjectsList from '../components/Projects/ProjectsList'
import Team from '../components/Team'
import { motion as m, AnimatePresence } from 'framer-motion'

function ContentBlock({children, ...props}) {
  return (
    <div className='ContentBlock' {...props}>
        { children }
    </div>
  )
}

export default function Home() {
  const [content, setContent] = useState('devspace');
  
  const selectItemCallback = (activeItem) => {
    setContent(activeItem)
  }

  return (
    <main className='App'>

      <m.div className='App__CommonWrapper'>

        <div className='App__Sidebar'>
          <Menu selectItemCallback={selectItemCallback} defaultItem={content}/>
          <CommandLine category={content}/>
        </div>

        <div className='App__Content'>
          <div className='ContentBlock'>
            <AnimatePresence  mode="wait">

              { content === 'devspace' &&  (
                  <m.div
                    key='devspace'
                  >
                    <Devspace/>
                  </m.div>
                )}
              { content === 'services' &&  (
                <m.div
                  key='services'
                >
                  <ServicesList/>
                </m.div>
              )}
                
              { content === 'projects' &&  (
                <m.div>
                  <ProjectsList/>
                </m.div>
              )}
                
              { content === 'team' &&  (
                <m.div>
                  <Team/>
                </m.div>
              )}
              
            </AnimatePresence>
          </div>
        </div>

      </m.div>

      {/* 
        <span>pshenmic&apos;s development page</span>
        
        <div className={"github"}>
          
          <div>open source blockchain developer</div>
          <a href={"https://github.com/pshenmic"}>github.com/pshenmic</a>

        </div> 
      */}

    </main>
  )
}
