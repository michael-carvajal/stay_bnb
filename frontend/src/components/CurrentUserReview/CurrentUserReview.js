import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../SpotDetail/DeleteReviewModal";

export default function CurrentUserReview() {
    const dispatch = useDispatch();
    const { reviews } = useSelector(state => state)
    const allReviews = !reviews.user ? null : Object.values(reviews.user).map(review => review)

    useEffect(() => {
        dispatch(getUserReviews())
    }, [dispatch])
    if (!allReviews) {
        return (<h1>Loading...</h1>)
    }
console.log("allReviews of current =====>", allReviews);
    return (
        <div className="manage-spots">
            <div>
                <h1>Manage Your Reviews</h1>
            </div>
            <div className="reviews" style={{border:"none"}}>
                {
                    allReviews.map(review => {
                        const date = new Date(review.updatedAt);
                        // Get the name of the month
                        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                        ];
                        const monthName = monthNames[date.getMonth()];

                        // Get the number of the day
                        // const dayNumber = date.getDate();

                        // Get the number of the year
                        const yearNumber = date.getFullYear();


                        // const userId = currentUser.user?.id
                        // const reviewOwnerId = review.user?.id || review.User?.id

                        return (
                            <div key={review.id} className="each-review">
                                <p>{review.Spot.name} </p>
                                <p className="review-date">{`${monthName} ${yearNumber}`}</p>
                                <p>{review.review}</p>
                                <div className="update-delete">
                                    <OpenModalButton buttonText={"Update"} modalComponent={<DeleteReviewModal spotId={review.Spot.id} reviewId={review.id} />} />
                                    <OpenModalButton buttonText={"Delete"} modalComponent={<DeleteReviewModal spotId={review.Spot.id} reviewId={review.id} />} />
                                </div>
                                {/* <p>{review.user?.firstName || review.User?.firstName}</p>
                                {userId === reviewOwnerId ?
                                    : null} */}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
