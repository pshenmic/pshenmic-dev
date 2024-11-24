import HasAdminAccess from '@/components/HasAdminAccess/HasAdminAccess'
import EditingWindow from '@/components/UI/EditingWindow/EditingWindow'
import RegistrationWindow from '@/components/Registration/RegistrationWindow'
import './globals.css'

export const metadata = {
  title: 'pshenmic.Dev',
  description: 'Developer space of pshenmic'
}

export default function RootLayout ({ children }) {
  return (
    <html lang={'en'}>
      <body>
        <HasAdminAccess />
        <EditingWindow />
        <RegistrationWindow />
        {children}
      </body>
    </html>
  )
}
