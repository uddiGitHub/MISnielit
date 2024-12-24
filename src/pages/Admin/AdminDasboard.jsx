import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SidebarAdmin from '../../components/Sidebar/SidebarAdmin';
function AdminDasboard() {
  return (
    <>
      <BrowserRouter>
        <section className='main flex'>
          <div className='sidebarWrapper w-[20%]'>
            <SidebarAdmin />
          </div>
          <div className='content_Right w-[80%]'>Dashboard</div>
        </section>
      </BrowserRouter>

    </>
  )
}

export default AdminDasboard