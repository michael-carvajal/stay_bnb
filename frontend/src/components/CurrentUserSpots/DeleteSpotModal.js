import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteUserSpot } from "../../store/spots";
export default function DeleteSpotModal({ spotId }) {
    const { closeModal } = useModal()
    // console.log("spotId from props in review modal =====> ", spotId);
    const dispatch = useDispatch()
    const deleteSpot = async (e) => {
        const spotId = e.target.dataset.spot;
        dispatch(deleteUserSpot(spotId))
        closeModal()
    }

    return (
        <div className="delete-review-modal" >
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings</p>
            <span data-spot={spotId} className="confirm-delete yes-delete" onClick={deleteSpot}>Yes (Delete Spot)</span>
            <span data-spot={spotId} className="confirm-delete no-keep" onClick={closeModal}>No (Keep Spot)</span>

           </div>
    )
}
