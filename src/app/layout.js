import './globals.css'

export const metadata = {
  title: 'pshenmic.Dev',
  description: 'Developer space of pshenmic',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
