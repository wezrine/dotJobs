import React, { useState } from 'react'
import logo from './logo-white.png'
import { useHistory, NavLink } from "react-router-dom";
import { setAuthenticationHeader } from '../utils/authenticate'
import { connect } from 'react-redux'


function Header(props) {

    let history = useHistory()

    const [isBurgerActive, setisBurgerActive] = useState(false)

    const handleLogout = () => {

        localStorage.removeItem("jsonwebtoken")
        localStorage.removeItem("username")
        localStorage.removeItem('userId')
        setAuthenticationHeader(null)
        props.onLogOut()
        history.push('/login')
    }

    return (
        <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <p className="navbar-item">
                    <NavLink to = '/'><img src={logo} alt="logo" width="112" height="28" /></NavLink>
                </p>

                <p onClick={() => { setisBurgerActive(!isBurgerActive) }} role='button' className={`navbar-burger burger ${isBurgerActive ? 'is-active' : ''}`} aria-label='menu' aria-expanded='false' data-target='navbarBasicExample'>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </p>
            </div>

            <div id='navbarBasicExample' className={`navbar-menu ${isBurgerActive ? 'is-active' : ''}`}>
                <div className="navbar-start">
                    <NavLink to="/how-it-works" className="navbar-item">How it Works</NavLink>
                    <NavLink to="/jobs" className="navbar-item">My Jobs</NavLink>
                    <NavLink to="/add-job" className="navbar-item">Add a Job</NavLink>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        {props.isAuthenticated ? <button onClick={handleLogout} className="button is-link"><strong>Logout</strong></button> : <NavLink to='/login'><button className="button is-link"><strong>Login</strong></button></NavLink>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogOut: (token) => dispatch({ type: 'ON_LOGOUT' })
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)