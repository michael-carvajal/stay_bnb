import { csrfFetch } from "./csrf"
const GET_SPOTS = "spots/GET_SPOTS"

const CURRENT_SPOT = "spots/CURRENT_SPOT"
const CREATE_SPOT = "spots/CREATE_SPOT"
const DELETE_SPOT = "spots/DELETE_SPOT"
const UPDATE_SPOT = "spots/UPDATE_SPOT"


const allSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}
const currentSpotDetials = (details) => {
    return {
        type: CURRENT_SPOT,
        details
    }
}
const createSpot = (details) => {
    return {
        type: CREATE_SPOT,
        details
    }
}
const updateSpot = (details) => {
    return {
        type: CREATE_SPOT,
        spot: details.spot,
        images: details.images
    }
}
const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots');
    const returnedSpots = await response.json();
    dispatch(allSpots(returnedSpots.Spots))
}
export const getSpotDetails = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);
    const details = await response.json();
    console.log("details for the spot right here ====>", details);
    dispatch(currentSpotDetials(details))
}


export const postCreateSpot = (details) => async dispatch => {
    console.log("here are the post create spot details ====>", details.spot);
    const postSpot = await csrfFetch(`/api/spots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details.spot)
    });
    const spotThatWasCreated = await postSpot.json();
    console.log("created for the spot right here ====>", spotThatWasCreated);
    dispatch(createSpot(spotThatWasCreated))

    const previewImage = await csrfFetch(`/api/spots/${spotThatWasCreated.id}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: details.images.previewImage, preview: true })
    })
    const allImages = await Promise.all(
        details.images.images.map(async image => {
            const postImage = await csrfFetch(`/api/spots/${spotThatWasCreated.id}/images`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: image, preview: false })
            });
            return postImage;
        })
    );


    dispatch(createSpot(spotThatWasCreated))
    return spotThatWasCreated
}
export const fetchUserSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current');
    const userSpotsArray = await response.json();
    console.log('user spots array looks like this ===>', userSpotsArray);
    dispatch(allSpots(userSpotsArray.Spots))
}
export const deleteUserSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    });
    const deleteMessage = await response.json();
    console.log('deleted message looks like this ===>', deleteMessage);
    dispatch(deleteSpot(spotId))
}
export const putSpot = (details) => async dispatch => {
    console.log("here are the post create spot details ====>", details);
    const postSpot = await csrfFetch(`/api/spots/${details.spot.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details.spot)
    });
    const updatedSpot = await postSpot.json();

    console.log("created for the spot right here ====>", updatedSpot);

    // const previewImage = await csrfFetch(`/api/spots/${updatedSpot.id}/images`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ url: details.images.previewImage, preview: true })
    // })
    // const allImages = await Promise.all(
    //     details.images.images.map(async image => {
    //         const postImage = await csrfFetch(`/api/spots/${updatedSpot.id}/images`, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ url: image, preview: false })
    //         });
    //         return postImage;
    //     })
    // );


    dispatch(createSpot(updatedSpot))
    return updatedSpot
}

const initialState = { "spots": null }
export default function spotsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SPOTS: {
            const normalizedSpots = {allSpots : {}};
            action.spots.forEach(spot => {
                normalizedSpots.allSpots[spot.id] = spot
            });
            return { ...normalizedSpots }
        }
        case CURRENT_SPOT: {
            // console.log("this is the crrent state ====> ",state);
            // console.log("this is the current action ====> ",state);
            const spotsWithDetails = { ...state, [action.details.id]: { ...action.details } }

            return spotsWithDetails
        }
        case CREATE_SPOT: {

            const objWithNewSpot = { ...state, [action.details.id]: {...action.details}}

            return objWithNewSpot
        }
        case DELETE_SPOT: {
            const newSpotsObj = { ...state }
            delete newSpotsObj.allSpots[action.spotId]
            return newSpotsObj
        }
        case UPDATE_SPOT: {
            const newSpotsObj = { ...state }
            newSpotsObj[action.spot.id] = action.spot
            return newSpotsObj
        }



        default:
            return state
    }
}
