import RegistrationWindow from '@/components/Registration/RegistrationWindow'
import dynamic from "next/dynamic"
import { DashProvider } from '@/hooks/useDashClient'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';

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

export const metadata = {
  title: 'pshenmic.Dev',
  description: 'Developer space of pshenmic'
}

export default function RootLayout({ children }) {
  return (
    <html lang={'en'}>
      <body>
        <DashProvider>
          <ToastContainer />
          <EditingWindow />
          <RegistrationWindow />
          <ImportWalletWindow />
          {children}
        </DashProvider>
      </body>
    </html>
  )
}
