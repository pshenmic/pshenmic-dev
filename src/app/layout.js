import dynamic from 'next/dynamic'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

const ClientProviders = dynamic(() => import('@/components/ClientProviders'))

export const metadata = {
  title: 'pshenmic.Dev',
  description: 'Developer space of pshenmic'
}

export default function RootLayout({ children }) {
  return (
    <html lang={'en'}>
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
