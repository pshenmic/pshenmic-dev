import { motion as m, AnimatePresence } from 'framer-motion'
import { Route, Routes } from "react-router"
import ServicesList from "../Services/ServicesList"
import ProjectsList from "../Projects/ProjectsList"
import Team from "../Team"
import Updates from '../Updates'
import './ContentBlock.scss'

function ContentBlock() {
    return (
        <div className={'Content'}>
            <div className={'Content__ContentBlock'} key={'updates'}>
                <AnimatePresence mode={'wait'}>
                    <Routes location={window.location} key={window.location.href}>
                        <Route index key={'updatesRoute'} path={'/'}
                            element={
                                <m.div key={'updates'}>
                                    <Updates />
                                </m.div>
                            }
                        />

                        <Route key={'servicesRoute'} path={'/services'}
                            element={
                                <m.div key={'services'}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <ServicesList />
                                </m.div>
                            }
                        />

                        <Route key={'projectsRoute'} path={'/projects'}
                            element={
                                <m.div key={'projects'}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <ProjectsList />
                                </m.div>
                            }
                        />

                        <Route key={'teamRoute'} path={'/team'}
                            element={
                                <m.div key={'team'}>
                                    <Team />
                                </m.div>
                            }
                        />

                        <Route index key={'updatesRoute'} path={'/admin'}
                            element={
                                <m.div key={'updates'}>
                                    <Updates />
                                </m.div>
                            }
                        />

                        <Route key={'servicesRoute'} path={'/admin/services'}
                            element={
                                <m.div key={'services'}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <ServicesList />
                                </m.div>
                            }
                        />

                        <Route key={'projectsRoute'} path={'/admin/projects'}
                            element={
                                <m.div key={'projects'}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <ProjectsList />
                                </m.div>
                            }
                        />

                        <Route key={'teamRoute'} path={'/admin/team'}
                            element={
                                <m.div key={'team'}>
                                    <Team />
                                </m.div>
                            }
                        />
                    </Routes>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default ContentBlock