import HasAdminAccess from '@/components/HasAdminAccess/HasAdminAccess'
import EditingWindow from '@/components/UI/EditingWindow/EditingWindow'
import RegistrationWindow from '@/components/Registration/RegistrationWindow'
import ImportWalletWindow from '@/components/Registration/ImportWalletWindow'
import dynamic from "next/dynamic"
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { DashProvider } from '@/hooks/useDashClient'

const ToastContainer = dynamic(() =>
    import('react-toastify').then((mod) => mod.ToastContainer), 
    { ssr: false }
)

export const metadata = {
  title: 'pshenmic.Dev',
  description: 'Developer space of pshenmic'
}

export default function RootLayout ({ children }) {
  return (
    <DashProvider>
      <html lang={'en'}>
        <body>
          <ToastContainer />
          <HasAdminAccess />
          <EditingWindow />
          <RegistrationWindow />
        <ImportWalletWindow />
        {children}
      </body>
    </html>
    </DashProvider>
  )
}
