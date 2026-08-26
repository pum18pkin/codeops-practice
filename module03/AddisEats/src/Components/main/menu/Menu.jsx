import React from 'react'
import'./Menu.css'
import Dishes from './Dishes.json'
const Menu = () => {
    return (
    <div className='foodList'>
        {Dishes.map((dish)=>(
            <div key={dish.id} className='listes'>
                <p className='namu'>{dish.name}</p>
                <p classname="pricu">{dish.price}</p>
            </div>
        )
    )}
    </div>
    )
}

export default Menu
