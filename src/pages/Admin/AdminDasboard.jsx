import React from 'react'
import SidebarAdmin from '../../components/Sidebar/SidebarAdmin'
function AdminDasboard() {
  return (
    <>
        <section className='main flex'>
            <div className='sidebarWrapper w-[20%]'>
                <SidebarAdmin />
            </div>
            <div className='content_Right w-[80%]'>Dashboard</div>
        </section>
    </>
  )
}

export default AdminDasboard