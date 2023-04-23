import React, { useState } from 'react'
import "../styles/index.css"
import "../styles/pvp.css"
import Layout from '../components/Layout'
import "../styles/history.css"
import "../styles/footer.css"

const Myapp = ({Component , pageProps}) => {
  return (
    <Layout>
         <Component {...pageProps}/>
    </Layout>
  )
}

export default Myapp;