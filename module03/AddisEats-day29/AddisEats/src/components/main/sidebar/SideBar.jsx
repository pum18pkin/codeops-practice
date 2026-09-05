import React from 'react'
import './SideBar.css'

const SideBar = () => {
  return (
    <aside className="side">
      <h2>Delivery</h2>
      <p className="side-note">Free over ETB 300</p>

      <div className="side-hours">
        <h2>Hours</h2>
        <ul>
          <li>Mon–Fri · 9am – 10pm</li>
          <li>Sat–Sun · 10am – 11pm</li>
        </ul>
      </div>

      <div className="side-contact">
        <h2>Call us</h2>
        <p>+251 900 000 000</p>
      </div>
    </aside>
  )
}

export default SideBar
