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
        <h1>{username}'s Upcoming Livestreams</h1>
        <Link to="/dashboard/new"><button>Add new livestream</button></Link>
        <Route path="/dashboard/:action" render={(rp) => <Form {...rp} getStreams={getStreams}/>}/>
        <ul>
            {streams.map(stream => (
                <div>
                    <h2>{stream.band}</h2>
                    <h4>{stream.show_day}</h4>
                    <h4>{stream.show_link}</h4>
                        <button onClick={() => {
                            dispatch({type: "select", payload: stream})
                            props.history.push("/dashboard/edit")
                        }}>Edit</button>
                        <button onClick={() => {
                            fetch(url + "/livestreams/" + stream.id, {
                                method: "delete",
                                headers: {
                                    Authorization: "bearer " + token
                                }
                            }).then(() => getStreams());
                        }}>Delete</button>
                </div>
            ))}
        </ul>
        </div>
    }

    return streams ? loaded() : <h1>Loading...</h1>;
}

export default Dashboard