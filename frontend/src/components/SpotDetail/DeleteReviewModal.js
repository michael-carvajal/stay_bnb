import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteReview } from "../../store/reviews";
import { getSpotDetails } from "../../store/spots";
export default function DeleteReviewModal({ spotId, reviewId  }) {
    const { closeModal } = useModal()
    // console.log("spotId from props in review modal =====> ", spotId);
    const dispatch = useDispatch()

    const removeReview = (e) => {
        // const reviewId = e.target.value;
        dispatch(deleteReview(reviewId))
        dispatch(getSpotDetails(spotId))
        closeModal()
    }
    return (
        <div className="delete-review-modal" >
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings</p>
            <span data-spot={spotId} className="confirm-delete yes-delete" onClick={removeReview}>Yes (Delete Spot)</span>
            <span data-spot={spotId} className="confirm-delete no-keep" onClick={closeModal}>No (Keep Spot)</span>

        </div>
    )
}
