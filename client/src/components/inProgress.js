// Header 
    // const [isRegisterActive, setisRegisterActive] = useState(false)
    // const [credentials, setCredentials] = useState({})

    // const closeModal = () => {
    //     setisModalActive(!isModalActive)
    //     setisRegisterActive(false)
    // }

    // const handleOnChange = (e) => {
    //     setCredentials({
    //         ...credentials, 
    //         [e.target.name]: e.target.value
    //     })
    // }

    // const handleLogin = () => {
    //     fetch('http://localhost:8080/login', {
    //         method: 'POST', 
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }, 
    //         body: JSON.stringify(credentials)
    //     }).then(response => response.json())
    //     .then(result => {
    //         if(result.success) {
    //             console.log(this.props)
    //             const token = result.token 
    //             // get the token and put it in local storage 
    //             localStorage.setItem("jsonwebtoken", token)
    //             localStorage.setItem("username", result.username)
    //             // take the user to the jobs screen 
    //             this.props.history.push('/jobs')
    //         }
    //     })
    // }

                        {/* <div className="navbar-item has-dropdown is-hoverable">
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
                    </div> */}

    {/* 
            <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        {isRegisterActive ? <p className="modal-card-title">Register</p> : <p className="modal-card-title">Login</p>}
                        <button onClick={() => { closeModal() }} className="delete" aria-label="close"></button>
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
                        {isRegisterActive ? <button className="button is-success">Register</button> : <button onClick={handleLogin} className="button is-success">Login</button>}
                        {isRegisterActive ? <button className="button" onClick={() => { setisRegisterActive(false) }}>Login</button> : <button className="button" onClick={() => { setisRegisterActive(true) }}>Register</button>}
                        {isRegisterActive ? '' : <button className="button">Continue as Guest</button>}
                    </footer>
                </div>
            </div> */}