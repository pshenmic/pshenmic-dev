'use client'

import TeamEditingWindow from './TeamEditingWindow'
import UpdatesEditingWindow from './UpdatesEditingWindow'
import ServicesEditingWindow from './ServicesEditingWindow'
import ProjectEditingWindow from './ProjectEditingWindow'
import { usePathname } from 'next/navigation'
import './PageEditingWindows.scss'

function PageEditingWindows ({ clearErrors, errors, register, setValue }) {
  const path = usePathname()

  return (
    <>
      { path === '/admin' && <UpdatesEditingWindow key={'UpdatesEditingWindow'} errors={errors} register={register} setValue={setValue} clearErrors={clearErrors}/> }
      { path === '/admin/services' && <ServicesEditingWindow key={'ServicesEditingWindow'} errors={errors} register={register} setValue={setValue} clearErrors={clearErrors}/> }
      { path === '/projects' && <ProjectEditingWindow key={'ProjectEditingWindow'} errors={errors} register={register} setValue={setValue} clearErrors={clearErrors}/> }
      { path === '/admin/team' && <TeamEditingWindow key={'TeamEditingWindow'} errors={errors} register={register} setValue={setValue} clearErrors={clearErrors}/> }
    </>
  )
}

export default PageEditingWindows
