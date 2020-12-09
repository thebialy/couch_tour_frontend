import React from "react"
import { Link } from "react-router-dom"
import { useAppState } from "../AppState.jsx"

const Form = (props) => {

    const {state, dispatch} = useAppState()
    const {token} = state
    const action = props.match.params.action
    const [formData, setFormData] = React.useState(state[action])

    const actions = {
        new: () => {
            return fetch(state.url + "/livestreams/", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + token
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        },
        edit: () => {
            return fetch(state.url + "/livestreams/" + state.edit.id, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + token
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        },
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name] : event.target.value})
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        actions[action]().then((data) => {
            props.getStreams()
            props.history.push("/dashboard/")
        });
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="band" 
                    value={formData.band} 
                    onChange={handleChange}
                />
                <input 
                    type="date" 
                    name="show_day" 
                    value={formData.show_day} 
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="show_link" 
                    value={formData.show_link} 
                    onChange={handleChange}
                />
                <input type="submit" value={action}/>
            </form>
        </div>
    )
}

export default Form