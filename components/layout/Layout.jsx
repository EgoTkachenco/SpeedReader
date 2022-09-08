import Navigation from './Navigation'
import Header from './Header'

const Layout = ({ children, title }) => {
  return (
    <div className="page-wrapper">
      <Navigation />
      <div className="page-content">
        <Header title={title} />
        {children}
      </div>
    </div>
  )
}

export default Layout
