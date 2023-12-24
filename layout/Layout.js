import Footer from '@/pages/components/Order/Footer'
import Header from '@/pages/components/Order/Header'
import React from 'react'

const Layout = ({children}) => {
  return (
    <React.Fragment>
        <Header/>
        {children}
        <Footer/>
    </React.Fragment>
  )
}
export default Layout