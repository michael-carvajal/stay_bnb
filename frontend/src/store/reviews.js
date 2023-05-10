import { csrfFetch } from "./csrf"
const GET_REVIEW = "/reviews/GET_REVIEW"
const POST_REVIEW = "/reviews/POST_REVIEW"
const DELETE_REVIEW = "/reviews/DELETE_REVIEW"

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
const removeReview = (spotId) => {
    return {
        type: DELETE_REVIEW,
        spotId
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
        console.log("this was created after post requrst ====> ", createdReview);
        createdReview.user = reviewObj.user.user
        dispatch(createReview(createdReview))
    } catch (error) {
        return error.json()
    }


}
export const deleteReview = (spotId) => async dispatch => {
    // console.log("this is review OBJ", spotId);
    try {
        const response = await csrfFetch(`/api/reviews/${spotId}`, {
            method: "DELETE"
        });
        const deleteMEssage = await response.json();
        console.log(deleteMEssage);
        dispatch(removeReview(spotId))
    } catch (error) {
        return error.json()
    }


}
const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_REVIEW: {
            const normalizeReview = {spot: {}};
            console.log("reviews repsonse =====>", action.reviews);
            action.reviews.Reviews?.forEach(review => {
                normalizeReview.spot[review.id] = {
                    id: review.id,
                    review: review.review,
                    createdAt: review.createdAt,
                    updatedAt: review.updatedAt,
                    stars: review.stars,
                    spotId: review.spotId,
                    User: { ...review.User },
                    ReviewImages : [...review.ReviewImages]
                }
            })
            return normalizeReview;
        }
        case POST_REVIEW: {
            const newReviews = { ...state };
            console.log("this is the action.review =>", action.review);
            console.log("reviews before ====>  ", newReviews);
            newReviews.spot[action.review.id] = action.review
            console.log("reviews after ===========================>  ", newReviews);
            return newReviews
        }
        case DELETE_REVIEW: {
            const newReviews = { ...state };
            console.log("new Reviews inside refucer =======>",newReviews);
            delete newReviews.spot[action.spotId]
            return newReviews
        }

        default:
            return state;
    }
}
export default reviewReducer;
