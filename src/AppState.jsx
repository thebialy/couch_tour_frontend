import React from "React"

// INITIAL STATE

const initialState = {
    url: "http://couch-tour-backend.herokuapp.com"
}

// REDUCER
// action = {type: "", payload: ---}
const reducer = (state, action) => {

    switch(action.type){
        default:
            return state
    }
}


// APPCONTEXT

const AppContext = React.createContext(null)

// APPSTATE Component

export const AppState = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return <AppContext.Provider value={{state, dispatch}}>{props.children}</AppContext.Provider>
}

//useAppState Hook
export const useAppState = () => {
    return React.useContext(AppContext)
}

