import React from 'react'
import 'bulma/css/bulma.min.css'
import 'bulma'

import { NavLink } from "react-router-dom";


function Header() {

    const [isBurgerActive, setisBurgerActive] = React.useState(false)
    const [isModalActive, setisModalActive] = React.useState(false)

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <p className="navbar-item">
                    <img src="https://bulma.io/images/bulma-logo.png" alt="logo" width="112" height="28" />
                </p>

                <p onClick={() => { setisBurgerActive(!isBurgerActive) }} role='button' className={`navbar-burger burger ${isBurgerActive ? 'is-active' : ''}`} aria-label='menu' aria-expanded='false' data-target='navbarBasicExample'>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </p>
            </div>

            <div id='navbarBasicExample' className={`navbar-menu ${isBurgerActive ? 'is-active' : ''}`}>
                <div className="navbar-start">
                    <NavLink to="/jobs" className="navbar-item">Jobs</NavLink>
                    <NavLink to="/" className="navbar-item">Interviews</NavLink>
                    <NavLink to="/" className="navbar-item">Calender</NavLink>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <p className="navbar-link">
                            More
                        </p>

                        <div className="navbar-dropdown">
                            <NavLink to="/" className="navbar-item">About</NavLink>
                            <NavLink to="/" className="navbar-item">How it Works</NavLink>
                            <NavLink to="/" className="navbar-item">Meet the Dev</NavLink>
                            <hr className="navbar-divider" />
                            <NavLink to="/" className="navbar-item">Report an issue</NavLink>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <NavLink to="/" className="navbar-item">My Profile</NavLink>
                        <div className="buttons">
                            <button onClick={() => { setisModalActive(!isModalActive) }} className="button is-primary"><strong>Login</strong></button>
                        </div>
                        {/* <div className="buttons">
                            <NavLink to="/" className="button is-primary"><strong>Sign up</strong></NavLink>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Login</p>
                        <button onClick={() => { setisModalActive(!isModalActive) }} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body vertical">
                       <input type="text" placeholder="Username"></input>
                       <input type="password" placeholder="Password"></input>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success">Login</button>
                        <button className="button">Register</button>
                        <button className="button">Continue as Guest</button>
                    </footer>
                </div>
            </div>
        </nav>
    )
}

export default Header