import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import {UserContext} from '../context/auth-context'

function NavBar(props) {

    const [user, setUser]= useContext(UserContext)


    // console.log(user, "NavBar")
    const logOut =()=>{setUser({
        token:              null,
        userId:             null,
        tokenExpriration :  null
    })}

    return (
        <header className='header'>
            <div className='nav-logo'>
                <h1>Travel Free</h1>
            </div>

            <nav className='navBar'>
                <ul>
                    {!user.token &&     <li> <Link to='/auth'>  Login  </Link> </li>}
                                        <li> <Link to='/events'> Events </Link> </li>
                    {user.token &&  <>
                                        {/* <li> <Link to='/booking'> Booking </Link> </li> */}
                                        <li> <Link to='/' onClick={logOut}>  Logout  </Link></li>
                                    </>
                    }
                </ul>
            </nav>
            <p>{`Welcome: ${user.userId}`}</p>       
        </header>
    );
}

export default NavBar;