import React from 'react'
import'./Main.css'
import SideBar from './sidebar/SideBar'
import Menu from './menu/Menu'
const Main = () => {
  return (
    <div className='products'>
        <SideBar />
        <Menu />
    </div>
  )
}

export default Main
