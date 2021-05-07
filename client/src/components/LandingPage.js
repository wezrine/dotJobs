
import React from 'react'
import 'bulma/css/bulma.min.css'
import 'bulma'
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom";
 
function LandingPage(props) {
    return (
            <section className="hero is-primary landing">
                <div className="hero-body is-flex is-align-items-center">
                    <div className="container has-text-centered">
                        <div className="title"><h1><strong>dotJobs</strong></h1></div>
                        <h2 className="subtitle">The solution to your job search</h2>
                        {props.isAuthenticated ? '' : <NavLink to='/login'><button className="button is-info"><strong>Get Started</strong></button></NavLink>}
                    </div>
                </div>
            </section>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

export default connect(mapStateToProps)(LandingPage)