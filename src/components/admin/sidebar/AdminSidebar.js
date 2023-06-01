import React from 'react'
import './AdminSidebar.scss'
import { NavLink } from 'react-router-dom'

export default function AdminSidebar() {
    return (       
            <div className='bg-white p-2'>
                <div className='m-2'>
                    <i className="bi bi-person-circle me-2 fs-4"></i>
                    <span className='brand-name fs-4'>BIRD TRAVEL</span>
                </div>
                <hr />
                <div className='list-group list-group-flush'>
                    <NavLink to="/admin/dashboard" className="list-group-item py-2"
                    style={({ isActive }) => ({
                        color: isActive ? '#fff' : 'black',
                        background: isActive ? '#85C697' : 'white',
                      })}>
                        <i className="bi bi-bar-chart fs-5 me-3"></i>
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin/manage-account" className="list-group-item py-2"
                    style={({ isActive }) => ({
                        color: isActive ? '#fff' : 'black',
                        background: isActive ? '#85C697' : 'white',
                      })}>
                        <i className="bi bi-people fs-5 me-3"></i>
                        <span>Accounts</span>
                    </NavLink>
                </div>
            </div>            
    )
}
