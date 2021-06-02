import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setAuthenticationHeader } from '../utils/authenticate'

function Login(props) {

    const [credentials, setCredentials] = useState({})
    const [isRegisterActive, setisRegisterActive] = useState(false)

    const handleOnChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = () => {
        fetch('https://dotjobs.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    const token = result.token
                    localStorage.setItem("jsonwebtoken", token) // get the token and put it in local storage 
                    localStorage.setItem("username", result.username)
                    localStorage.setItem("userId", result.userId)
                    props.onLogin(token)
                    setAuthenticationHeader(token)
                    props.history.push('/jobs') // take the user to the jobs screen    
                }
            })
    }

    const handleContinueAsGuest = () => {

        let guest = {
            username: 'guest',
            password: 'guest123'
        }

        fetch('https://dotjobs.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(guest)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    const token = result.token
                    localStorage.setItem("jsonwebtoken", token) // get the token and put it in local storage 
                    localStorage.setItem("username", result.username)
                    localStorage.setItem("userId", result.userId)
                    props.onLogin(token)
                    setAuthenticationHeader(token)
                    props.history.push('/jobs') // take the user to the jobs screen 
                }
            })
    }

    const handleRegister = () => {
        fetch('https://dotjobs.herokuapp.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(() => {
            setisRegisterActive(false)
        })
    }

    return (
        <div className="login-box">
            <div className="modal-card">
                <header className="modal-card-head">
                    {isRegisterActive ? <p className="modal-card-title">Register</p> : <p className="modal-card-title">Login</p>}
                </header>
                <section className="modal-card-body vertical">
                    <div className='login-row is-flex'>
                        <span className="icon"><i className="fas fa-user"></i></span>
                        <input onChange={handleOnChange} className="login input" type="text" placeholder="Username" name="username" />
                    </div>
                    <div className='login-row is-flex'>
                        <span className="icon"><i className="fas fa-lock"></i></span>
                        <input onChange={handleOnChange} className="login input" type="password" placeholder="Password" name="password" />
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <div>
                        {isRegisterActive ? <button onClick={handleRegister} className="button is-link">Register</button> : <button onClick={handleLogin} className="button is-link">Login</button>}
                        {isRegisterActive ? <button className="button" onClick={() => { setisRegisterActive(false) }}>Login</button> : <button className="button" onClick={() => { setisRegisterActive(true) }}>Register</button>}
                    </div>
                    {isRegisterActive ? '' : <button onClick={handleContinueAsGuest} className="guest button">Continue as Guest</button>}
                </footer>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (token) => dispatch({ type: 'ON_LOGIN', payload: token })
    }
}

export default connect(null, mapDispatchToProps)(Login)