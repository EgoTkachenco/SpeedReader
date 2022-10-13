import Navigation from './Navigation'
import Header from './Header'
import Head from 'next/head'

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="page-wrapper">
        <Navigation />
        <div className="page-content">
          <Header title={title} />
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
