import React, { useState } from 'react'
import { connect } from 'react-redux'

function Login (props) {

    const [credentials, setCredentials] = useState({})
    const [isRegisterActive, setisRegisterActive] = useState(false)

    const handleOnChange = (e) => {
        setCredentials({
            ...credentials, 
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = () => {
        fetch('http://localhost:8080/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(credentials)
        }).then(response => response.json())
        .then(result => {
            if(result.success) {
                const token = result.token 
                // get the token and put it in local storage 
                localStorage.setItem("jsonwebtoken", token)
                localStorage.setItem("username", result.username)
                props.onLogin(token)
                // take the user to the jobs screen 
                props.history.push('/jobs')
            }
        })
    }

    const handleContinueAsGuest = () => {

        let guest = {
            username: 'guest',
            password: 'guest123'
        }

        fetch('http://localhost:8080/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(guest)
        }).then(response => response.json())
        .then(result => {
            if(result.success) {
                const token = result.token 
                // get the token and put it in local storage 
                localStorage.setItem("jsonwebtoken", token)
                localStorage.setItem("username", result.username)
                props.onLogin(token)
                // take the user to the jobs screen 
                props.history.push('/jobs')
            }
        })
    }

    const handleRegister = () => {
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers:  {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(() => {
            setisRegisterActive(false)
        })
    }

    return (
                <div className="modal-card">
                    <header className="modal-card-head">
                        {isRegisterActive ? <p className="modal-card-title">Register</p> : <p className="modal-card-title">Login</p>}
                    </header>
                    <section className="modal-card-body vertical">
                        <div className='login-row'>
                            <span className="icon"><i className="fas fa-user"></i></span>
                            <input onChange={handleOnChange} className="input" type="text" placeholder="Username" name="username" />
                        </div>
                        <div className='login-row'>
                            <span className="icon"><i className="fas fa-lock"></i></span>
                            <input onChange={handleOnChange} className="input" type="password" placeholder="Password" name="password" />
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        {isRegisterActive ? <button onClick={handleRegister} className="button is-success">Register</button> : <button onClick={handleLogin} className="button is-success">Login</button>}
                        {isRegisterActive ? <button className="button" onClick={() => { setisRegisterActive(false) }}>Login</button> : <button className="button" onClick={() => { setisRegisterActive(true) }}>Register</button>}
                        {isRegisterActive ? '' : <button onClick={handleContinueAsGuest} className="button">Continue as Guest</button>}
                    </footer>
                </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (token) => dispatch({type: 'ON_LOGIN', payload: token})
    }
}

export default connect(null, mapDispatchToProps)(Login)