import React from 'react'
import './Main.css'
import SideBar from './sidebar/SideBar'
import Menu from './menu/Menu'

const Main = ({ dishes = [], loading = false, error = null }) => {
  return (
    <main className="products">
      <SideBar />
      <Menu dishes={dishes} loading={loading} error={error} />
    </main>
  )
}

export default Main
