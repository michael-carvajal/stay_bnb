const GET_REVIEW="/reviews/GET_REVIEW"
const getReview = (reviews) => {
    return {
        type: GET_REVIEW,
        reviews
    }
}

export const fetchReview = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response.json();
    dispatch(getReview(reviews))
}
const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_REVIEW:
            const normalizeReview = {};
            // console.log("reviews repsonse =====>", reviews);
            action.reviews.Reviews.forEach(review => normalizeReview[review.id] = review)
            return normalizeReview;

        default:
            return state;
    }
}
export default reviewReducer;
