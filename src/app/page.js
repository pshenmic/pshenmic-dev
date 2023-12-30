"use client";

import './App.scss'
import { useState, useEffect } from 'react';
import Menu from '../components/Menu'
import CommandLine from '../components/CommandLine/CommandLine'
import Updates from '../components/Updates'
import ServicesList from '../components/Services/ServicesList'
import ProjectsList from '../components/Projects/ProjectsList'
import Team from '../components/Team'
import { motion as m, AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const defaultContent = 'updates'

export default function App() {
  const [content, setContent] = useState(defaultContent);
  const [render, setRender] = useState(false);
  
  useEffect(() => {
    setRender(true) 
    updateContent()
  }, [content]);

  const updateContent = () => {
    const pathArray = window.location.pathname.split('/').slice(1)
    setContent(pathArray[0] !== '' ? pathArray[0] : defaultContent)
  } 

  return render ? 

  <Router>
                
    <main className='App'>

      <m.div className='App__CommonWrapper'>

        <div className='App__Sidebar'>
          <Menu selectItemCallback={setContent} defaultItem={content}/>
          <CommandLine category={content}/>
        </div>

        <div className='App__Content'>

          <div className='ContentBlock' key='updates'>

            <AnimatePresence mode="wait">

              <Routes location={window.location} key={window.location.href}>
                <Route index key='updatesRoute' path="/"
                  element={
                    <m.div key='updates'>
                      <Updates/>
                    </m.div>
                  }
                />

                <Route key='servicesRoute' path="/services"
                  element={
                    <m.div key='services'
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: .5}}

                    >
                      <ServicesList/>
                    </m.div>
                  }
                />

                <Route key='projectsRoute' path="/projects"
                  element={
                    <m.div key='projects'
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: .5 }}
                    >
                      <ProjectsList/>
                    </m.div>
                  }
                />

                <Route key='teamRoute' path="/team"
                  element={
                    <m.div key='team'>
                      <Team/>
                    </m.div>
                  }
                />
              </Routes>

            </AnimatePresence>

          </div>

        </div>

      </m.div>
      
    </main>

  </Router> : null;
    
}
