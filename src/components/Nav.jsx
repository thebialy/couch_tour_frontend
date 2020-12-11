import React from "react"
import { Link } from "react-router-dom"
import { useAppState } from "../AppState.jsx"

const Nav = (props) => {

    const {state, dispatch} = useAppState()

    return <header>
        
        <nav>
        {!state.token ? (
            <div className="nav-div">
            <Link to="/"><div className="btn-nav">Home</div></Link>
            <Link to="/auth/signup"><div className="btn-nav">Signup</div></Link>
            <Link to="/auth/login"><div className="btn-nav">Login</div></Link>
            </div>
        ) : null}
        <div className="nav-div">
            {state.token ? <div className="btn-nav" onClick={() => {
                dispatch({type: "logout"})
                props.history.push("/")
            }}>Logout</div> : null}
            </div>
        </nav>
        <h1 className="neon">Couch Tour</h1>
    </header>
}

export default Nav