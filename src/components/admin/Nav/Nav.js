import React from 'react'
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import { NavLink } from 'react-router-dom';

export default function Nav() {
    return (
        <nav className='navbar navbar-expand-sm navbar-dark bg-transparent'>
            <div className='collapse navbar-collapse' id='collapsibleNavId'>
                <ul className='navbar-nav ms-auto mt-2 mt-lg-0'>
                    <li className='nav-item dropdown'>
                        <a className='nav-link dropdown-toggle' href='#admin' id='dropdownId'
                            data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                            Admin
                        </a>
                        <div className='dropdown-menu' aria-labelledby='dropdownId'>
                            <NavLink className="dropdown-item" to='/login'>Logout</NavLink>
                        </div>

                    </li>
                </ul>

            </div>
        </nav>
    )
}
