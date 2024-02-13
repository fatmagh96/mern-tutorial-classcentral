// import React from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link , useNavigate} from "react-router-dom";
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import {logout, reset} from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dipatch = useDispatch()
    const {user} = useSelector((state)=>state.auth)

    const onLogout = ()=>{
        dipatch(logout())
        dipatch(reset())
        navigate('/')
    }
  
    return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>GoalSetter</Link>    
        </div>
        <ul>
            {user ? (<li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </li>):(<>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt/> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser /> Register
                    </Link>
                </li>
                
            
            </>)
}
        </ul> 
    </header>
  )
}

export default Header