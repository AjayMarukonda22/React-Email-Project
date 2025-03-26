import React from 'react'
import { useState } from 'react'

const Navbar = ({setFilterType, filterType, searchTerm, setSearchTerm}) => {

  return (
    <nav className='Navbar flex gap-x-40 pt-4  ml-24 font-medium'>
        <div className='flex gap-x-4'>
            <p>Filter By: </p>
            <button className = {`border border-[#CFD2DC] p-2 rounded-2xl w-15 cursor-pointer ${filterType === 'all' ? 'bg-[#E1E4EA]' : ''}`}    onClick={() => setFilterType('all')}>All</button>
            <button className= {`border border-[#CFD2DC] p-2 rounded-2xl w-25 cursor-pointer ${filterType === 'unread' ? 'bg-[#E1E4EA]' : ''}`} onClick={() => setFilterType('unread')}>Unread</button>
            <button className={`border border-[#CFD2DC] p-2 rounded-2xl w-25 cursor-pointer ${filterType === 'read' ? 'bg-[#E1E4EA]' : ''}`} onClick={() => setFilterType('read')}>Read</button>
            <button className= {`border border-[#CFD2DC] p-2 rounded-2xl w-30 cursor-pointer ${filterType === 'favorite' ? 'bg-[#E1E4EA]' : ''}`} onClick={() => setFilterType('favorite')}>Favorites</button>
        </div>
        <input type = 'text' placeholder='Search by name.....' className='border border-[#CFD2DC] w-[30%] rounded-2xl p-2' value = {searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
    </nav>
  )
}

export default Navbar