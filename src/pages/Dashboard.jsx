import React from "react"
import {useAppState} from "../AppState.jsx"
import { Route, Link} from "react-router-dom"
import Form from "../components/Form.jsx"

const Dashboard = (props) => {

    const {state, dispatch} = useAppState()
    const {token, url, streams, username} = state

    const getStreams = async () => {
        const response =  await fetch(url + "/livestreams/", {
            method: "get",
            headers: {
                Authorization: "bearer " + token
            }
        })
        const streams = await response.json()
        dispatch({type: "getStreams", payload: streams})
    }

    React.useEffect(() => {getStreams()}, [])

    const loaded = () => {
        return <div>
        
        <Link to="/dashboard/new"><a className="new-btn">Add new livestream</a></Link>
        <Route path="/dashboard/:action" render={(rp) => <Form {...rp} getStreams={getStreams}/>}/>
        <div className="stream-h2"><h2>Upcoming Livestreams</h2></div>
        <br/>
        <section className="card-section">
            <div className="card-grid">
            {streams.map(stream => (                   
                <a className="card">
                    <div className="card-background" style={{backgroundImage: `url(${stream.img})`}}></div>  
                    <div className="card-content">                
                        <p className="card-show-day">{stream.show_day}</p>
                        <h2 className="card-band">{stream.band}</h2>
                        <h4 className="card-link">{stream.show_link}</h4>
                        <a className="card-btn"onClick={() => {
                            dispatch({type: "select", payload: stream})
                            props.history.push("/dashboard/edit")
                        }}>Edit</a>
                        <a className="card-btn" onClick={() => {
                            fetch(url + "/livestreams/" + stream.id, {
                                method: "delete",
                                headers: {
                                    Authorization: "bearer " + token
                                }
                            }).then(() => getStreams());
                        }}>Delete</a>
                    </div>     
                </a>                 
            ))}
            </div> 
         </section>
        </div>
    }
    return streams ? loaded() : <h1>Loading...</h1>;
}

export default Dashboard