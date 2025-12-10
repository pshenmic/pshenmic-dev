'use client'

import dynamic from "next/dynamic"

const DashProvider = dynamic(() =>
  import('@/hooks/useDashClient').then((mod) => mod.DashProvider),
  { ssr: false }
)

const ToastContainer = dynamic(() =>
  import('react-toastify').then((mod) => mod.ToastContainer),
  { ssr: false }
)

const EditingWindow = dynamic(() =>
  import('@/components/UI/EditingWindow/EditingWindow'),
  { ssr: false }
)

const ImportWalletWindow = dynamic(() =>
  import('@/components/Registration/ImportWalletWindow'),
  { ssr: false }
)

const RegistrationWindow = dynamic(() =>
  import('@/components/Registration/RegistrationWindow'),
  { ssr: false }
)

export default function ClientProviders({ children }) {
  return (
    <DashProvider>
      <ToastContainer />
      <EditingWindow />
      {/* <RegistrationWindow /> */}
      <ImportWalletWindow />
      {children}
    </DashProvider>
  )
}

