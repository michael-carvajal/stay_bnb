const GET_SPOTS = "spots/GET_SPOTS"
const CURRENT_SPOT = "spots/CURRENT_SPOT"

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

export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots');
    const returnedSpots = await response.json();
    dispatch(allSpots(returnedSpots.Spots))
}
export const getSpotDetails = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);
    const details = await response.json();
    console.log("details for the spot right here ====>",details);
    dispatch(currentSpotDetials(details))
}


const initialState = { "spots": null }
export default function spotsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SPOTS: {
            const normalizedSpots = {};
            action.spots.forEach(spot => {
                normalizedSpots[spot.id] = spot
            });
            return { ...normalizedSpots}
        }
        case CURRENT_SPOT: {
            const spotsWithDetails = { ...state, [action.details.id] : {...action.details} }

            return spotsWithDetails
        }


        default:
            return state
    }
}
