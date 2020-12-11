import React, {useContext, useReducer} from "react"

// INITIAL STATE

const initialState = {
    url: "https://couchtourbackend.herokuapp.com",
    token: null,
    username: null,
    streams: null,
    new: {
        band: "",
        show_day: "",
        show_link: ""
    },
    edit: {
        id: 0,
        band: "",
        show_day: "",
        show_link: ""
    }
}

// REDUCER

const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case "auth":
            newState = { ...state, ...action.payload };
            return newState;
            break;
        case "logout":
            newState = {...state, token: null, username: null}
            window.localStorage.removeItem("auth")
            return newState;
            break
        case "getStreams":
            newState = {...state, streams: action.payload}
            return newState
            break
        case "select":
            newState = {...state, edit: action.payload}
            return newState;
            break;
        default:
            return state;
            break;
    }
};


// APPCONTEXT

const AppContext = React.createContext(null)

// APPSTATE Component

export const AppState = (props) => {
    
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
         <AppContext.Provider value={{state, dispatch}}>
            {props.children}
        </AppContext.Provider>
    ) 

}

//useAppState Hook
export const useAppState = () => {
    return useContext(AppContext)
}

