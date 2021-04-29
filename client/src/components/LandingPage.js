
import React from 'react'
import 'bulma/css/bulma.min.css'
import 'bulma'
 
function LandingPage() {
    return (
        <div>
            <section className="hero is-primary is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="title"><h1>Hello, Bulma!</h1></div>
                        <h2 className="subtitle">This is react app feat. Bulma</h2>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage