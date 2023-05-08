import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchUserSpots } from "../../store/spots";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
const CurrentUserSpots = () => {
    const userSpots = useSelector(state => state.spots)
    const spotsArray = Object.values(userSpots).map(spot => spot)
    console.log(spotsArray);
const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserSpots())
    }, [dispatch])
    return (
        <div className="manage-spots">
            <div className="manage-heading">
                <h1>Manage Your Spots</h1>
                <div className="reserve-btn">Create a New Spot</div>
            </div>
            <div className="show-spots">
                {spotsArray.map(spot => {
                    console.log(spot?.id);
                    return (
                        <NavLink key={spot?.id} className="spot-card" to={`/spots/${spot?.id}`}>
                            <img src={spot?.previewImage} alt={spot?.name} className="preview-image" onError={(e) => { e.target.onerror = null; }} />

                            <div className="location-rating">
                                <p>{spot?.city}, {spot?.state}</p>
                                <p>{spot?.avgRating}</p>
                            </div>
                            <div>${spot?.price} night</div>

                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}
export default CurrentUserSpots
