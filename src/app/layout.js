import EditingWindow from '@/components/UI/EditingWindow/EditingWindow'
import RegistrationWindow from '@/components/Registration/RegistrationWindow'
import ImportWalletWindow from '@/components/Registration/ImportWalletWindow'
import dynamic from "next/dynamic"
import { DashProvider } from '@/hooks/useDashClient'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';

const ToastContainer = dynamic(() =>
  import('react-toastify').then((mod) => mod.ToastContainer),
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
