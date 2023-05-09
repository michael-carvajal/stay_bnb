import { csrfFetch } from "./csrf"
const GET_REVIEW = "/reviews/GET_REVIEW"
const POST_REVIEW = "/reviews/POST_REVIEW"

const getReview = (reviews) => {
    return {
        type: GET_REVIEW,
        reviews
    }
}
const createReview = (review) => {
    return {
        type: POST_REVIEW,
        review
    }
}

export const fetchReview = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response.json();
    return dispatch(getReview(reviews))

}
export const postReview = (reviewObj) => async dispatch => {
    // console.log("this is review OBJ", reviewObj);
    try {
        const response = await csrfFetch(`/api/spots/${reviewObj.spotId}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ review: reviewObj.review, stars: reviewObj.stars })
        });
        const createdReview = await response.json();
        console.log(createdReview);
        dispatch(createReview(createdReview))
    } catch (error) {
        return error.json()
    }


}
const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_REVIEW: {
            const normalizeReview = {};
            // console.log("reviews repsonse =====>", reviews);
            action.reviews.Reviews?.forEach(review => {

                normalizeReview[review.id] = review
            })
            return normalizeReview;
        }
        case POST_REVIEW: {
            const newReviews = { ...state };
            newReviews[action.review.id] = action.review
            return newReviews
        }

        default:
            return state;
    }
}
export default reviewReducer;
