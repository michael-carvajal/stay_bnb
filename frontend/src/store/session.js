import { csrfFetch } from "./csrf"
const LOG_IN = "session/LOG_IN"
const LOG_OUT = "session/LOG_OUT"

const logIn = (user) => {
    return {
        type: LOG_IN,
        user
    }
}
const logOut = (user) => {
    return {
        type: LOG_OUT,
        user
    }
}

export const  sessionLogIn = (user) => async dispatch => {


    console.log(1);
    console.log(user);
    const response = await csrfFetch('/api/session', {
        method: "POST",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(user)
    })
    console.log(2);

    if (response.ok) {
        const signedInUser = await response.json();
        return dispatch(logIn(signedInUser))
    } else {
        const error = await response.json();
        console.log(2);

        console.log(error);
    }
}


const initialState = { "user" : null}
export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case LOG_IN:{
            return {...action.user} }
        case LOG_OUT:{
            return initialState }

        default:
            return state
    }
}
