const GET_SPOTS = "spots/GET_SPOTS"

const allSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots');
    const returnedSpots = await response.json();
    dispatch(allSpots(returnedSpots.Spots))
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


        default:
            return state
    }
}
