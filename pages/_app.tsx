import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='flex flex-col min-h-screen bg-white text-black'>
      <div className='flex justify-center'>
        <Navbar />
      </div>
      <main className='flex-grow '>
        <Component {...pageProps} />
      </main>
      <footer className='mt-auto'>
        <Footer />
      </footer>
    </div>
  )
}

export default MyApp