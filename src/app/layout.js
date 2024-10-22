import HasAdminAccess from '@/components/HasAdminAccess/HasAdminAccess'
import './globals.css'
import EditingWindow from '@/components/UI/EditingWindow/EditingWindow'

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
        {children}
      </body>
    </html>
  )
}
