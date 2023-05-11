import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteUserSpot, fetchUserSpots } from "../../store/spots";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./CurrentUserSpots.css"
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

    const deleteSpot = async (e) => {
        const spotId = e.target.dataset.spot;
         dispatch(deleteUserSpot(spotId))
    }

    return (
        <div className="manage-spots">
            <div className="manage-heading">
                <h1>Manage Your Spots</h1>
                <NavLink to="/spots/new" className="smaller-btn manage-create-spot">Create a New Spot</NavLink>
            </div>
            <div className="current-spots">
                {spotsArray.map(spot => {
                    console.log(spot?.id);
                    return (
                        <div key={spot?.id} className="manage-spot-card" to={`/spots/${spot?.id}`}>
                            <img src={spot?.previewImage} alt={spot?.name} className="preview-image" onError={(e) => { e.target.onerror = null; }} />

                            <div className="location-rating">
                                <p>{spot?.city}, {spot?.state}</p>
                                <p>{spot?.avgRating}</p>
                            </div>
                            <div>${spot?.price} night</div>
                            <div className="update-delete">
                                <NavLink to={`/spots/${spot?.id}/edit`} className="reserve-btn">Update</NavLink>
                                <span data-spot={spot?.id} className="reserve-btn" onClick={deleteSpot}>Delete</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default CurrentUserSpots
