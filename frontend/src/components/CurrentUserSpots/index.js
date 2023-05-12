import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteUserSpot, fetchUserSpots } from "../../store/spots";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./CurrentUserSpots.css"
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "./DeleteSpotModal";
const CurrentUserSpots = () => {
    let {allSpots} = useSelector(state => state.spots)
    console.log("this is userSpts from currentUserSpots =====================>   ", allSpots);
    const spotsArray = !allSpots ? null : Object.values(allSpots).map(spot => spot)

    console.log(spotsArray);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserSpots())
    }, [])

    if (!spotsArray) {
        return (<h2>Loading...</h2>)
    }


    return (
        <div className="manage-spots">
            <div className="manage-heading">
                <h1>Manage Your Spots</h1>
                {spotsArray.length  === 0 && <NavLink to="/spots/new" className="smaller-btn manage-create-spot">Create a New Spot</NavLink>}
            </div>
            <div className="current-spots">
                {spotsArray.map(spot => {
                    console.log(spot?.id);
                    const roundedAvg = spot?.avgRating
                    const rating = spot?.avgRating === null ? <p className="normal-font">New</p> : <p className="normal-font">{roundedAvg}</p>;
                    return (
                        <NavLink key={spot?.id} className="manage-spot-card" to={`/spots/${spot?.id}`}>
                            <img src={spot?.previewImage} alt={spot?.name} className="preview-image" onError={(e) => { e.target.onerror = null; }} />

                            <div className="location-rating">
                                <p>{spot?.city}, {spot?.state}</p>
                                {rating}
                            </div>
                            <div>${spot?.price} night</div>
                            <div className="update-delete">
                                <NavLink to={`/spots/${spot?.id}/edit`} className="reserve-btn">Update</NavLink>
                                <OpenModalButton buttonText={"Delete"} modalComponent={<DeleteSpotModal spotId={spot?.id} />} />
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}


export default CurrentUserSpots
