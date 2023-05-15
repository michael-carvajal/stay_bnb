import { csrfFetch } from "./csrf"
const GET_REVIEW = "/reviews/GET_REVIEW"
const POST_REVIEW = "/reviews/POST_REVIEW"
const DELETE_REVIEW = "/reviews/DELETE_REVIEW"
const USER_REVIEWS = "/reviews/USER_REVIEWS"
const PUT_REVIEW = "/reviews/PUT_REVIEW"

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
const updateReview = (review, reviewId) => {
    return {
        type: PUT_REVIEW,
        review,
        reviewId
    }
}
const removeReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}
const userReviews = (reviews) => {
    return {
        type: USER_REVIEWS,
        reviews
    }
}

export const fetchReview = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response.json();
    return dispatch(getReview(reviews))

}
export const getUserReviews = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/current`);
    const reviews = await response.json();
    console.log("These are a reviews of current user ========>", reviews);
    return dispatch(userReviews(reviews))

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
export const putReview = (reviewObj, reviewId) => async dispatch => {
    console.log("this is review OBJ", reviewObj);
    console.log("this is review id=========>", reviewId);
    try {
        const response = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ review: reviewObj.review, stars: reviewObj.stars })
        });
        const updatedReview = await response.json();
        console.log("this was created after post requrst ====> ", updatedReview);
        updatedReview.user = reviewObj.user.user
        dispatch(updateReview(updatedReview, reviewId))
        // dispatch(getUserReviews())

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
        // dispatch(getUserReviews())
    } catch (error) {
        return error.json()
    }


}
const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_REVIEW: {
            const normalizedReviews = {};
            action.reviews.Reviews?.forEach((review) => {
                normalizedReviews[review.id] = {
                    id: review.id,
                    review: review.review,
                    createdAt: review.createdAt,
                    updatedAt: review.updatedAt,
                    stars: review.stars,
                    spotId: review.spotId,
                    User: { ...review.User },
                    ReviewImages: [...review.ReviewImages],
                };
            });
            return { spot: normalizedReviews };
        }

        case POST_REVIEW: {
            const newReviews = { ...state };
            console.log("this is the action.review =>", action.review);
            console.log("reviews before ====>  ", newReviews);
            newReviews.spot[action.review.id] = action.review
            console.log("reviews after ===========================>  ", newReviews);
            return newReviews
        }
        case PUT_REVIEW: {
            const { reviewId, review } = action;
            const newReview = { ...review };
            const newSpot = {
                ...state.spot,
                [reviewId]: newReview,
            };
            const newState = { ...state, spot: newSpot };
            return newState;
        }
        case DELETE_REVIEW:
            const { [action.reviewId]: deletedSpot, ...remainingSpots } = state.spot;
            return {
                ...state,
                spot: remainingSpots,
            };

        case USER_REVIEWS: {
            const normalizeReview = { user: {} };
            console.log("reviews repsonse =====>", action.reviews);
            action.reviews.Reviews?.forEach(review => {
                normalizeReview.user[review.id] = {
                    id: review.id,
                    review: review.review,
                    createdAt: review.createdAt,
                    updatedAt: review.updatedAt,
                    stars: review.stars,
                    spotId: review.spotId,
                    User: { ...review.User },
                    ReviewImages: [...review.ReviewImages],
                    Spot: { ...review.Spot }
                }
            })
            return normalizeReview;
        }

        default:
            return state;
    }
}
export default reviewReducer;
