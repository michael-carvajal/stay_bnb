/*

*/
import { csrfFetch } from "./csrf"
const LOG_IN = "session/LOG_IN"
const LOG_OUT = "session/LOG_OUT"
const GET_CURRENT_USER = "session/GET_CURRENT_USER"

const logIn = (user) => {
    return {
        type: LOG_IN,
        user
    }
}
const logOut = () => {
    return {
        type: LOG_OUT
    }
}
const getUser =(user)  => {
    return {
        type: GET_CURRENT_USER,
        user
    }
}

export const fetchUser = () => async dispatch => {
    const response = await csrfFetch("/api/session");

    const user = await response.json();
    dispatch(getUser(user))
    return user

}
export const  sessionLogIn = (user) => async dispatch => {


    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: "POST",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({
            credential,
            password,
        })
    })


    if (response.ok) {
        const signedInUser = await response.json();
        return dispatch(logIn(signedInUser))
    } else {
        const error = await response.json();

        console.log("error in else statement ==>", error);
    }
}
export const restoreUser = () => async (dispatch) => {

  const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(logIn(data));
    return response;
};
export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password,
        }),
    });
    const data = await response.json();
    dispatch(logIn(data));
    return response;
};
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(logOut());
    return response;
};
const initialState = { "user" : null}
export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case LOG_IN:{
            return {...action.user} }
        case LOG_OUT:{
            return initialState }
        case GET_CURRENT_USER:{
            return {...action.user} }

        default:
            return state
    }
}
