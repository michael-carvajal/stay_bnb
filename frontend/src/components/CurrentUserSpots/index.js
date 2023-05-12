import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteUserSpot, fetchUserSpots } from "../../store/spots";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./CurrentUserSpots.css"
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "./DeleteSpotModal";
import missingImage from "../../assets/images/no-photo.jpeg"
const CurrentUserSpots = () => {
    let { allSpots } = useSelector(state => state.spots)
    console.log("this is userSpts from currentUserSpots =====================>   ", allSpots);
    const spotsArray = !allSpots ? null : Object.values(allSpots).map(spot => spot)

    console.log(spotsArray);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserSpots())
    }, [])

    if (!spotsArray) {
        dispatch(fetchUserSpots())
        return (<h2>Loading...</h2>)
    }


    return (
        <div className="manage-user-spots">

            <div className="manage-heading">
                <h1>Manage Your Spots</h1>
                {spotsArray.length === 0 && <NavLink to="/spots/new" className="smaller-btn manage-create-spot">Create a New Spot</NavLink>}

            </div>
            <div className="show-spots">
                {spotsArray?.map((spot, index) => {
                    // console.log(spot?.id);
                    const roundedAvg = spot?.avgRating
                    const rating = spot?.avgRating === null ? <p className="normal-font">New</p> : <p className="normal-font">{roundedAvg}</p>;
                    return (
                        <div >

                            <NavLink key={`spotIndex-${index}`} to={`/spots/${spot?.id}`} className="spot-card" data-tooltip={spot.name}>
                                <img src={spot?.previewImage} alt={spot?.name} className="preview-image" onError={(e) => { e.target.onerror = null; e.target.src = missingImage; }} />

                                <div className="location-rating ">
                                    <p className="normal-font">{spot?.city}, {spot?.state}</p>
                                    {rating}
                                </div>
                                <div className="normal-font"><p className="reserve-price"> ${spot?.price}</p> night</div>

                            </NavLink>
                            <div className="update-delete">
                                <NavLink to={`/spots/${spot?.id}/edit`} className="reserve-btn">Update</NavLink>
                                <OpenModalButton buttonText={"Delete"} modalComponent={<DeleteSpotModal spotId={spot?.id} />} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default CurrentUserSpots

            // <div className="show-spots">
            //     <div className="spot-card">
            //         {spotsArray.map(spot => {
            //             console.log(spot?.id);
            //             const roundedAvg = spot?.avgRating
            //             const rating = spot?.avgRating === null ? <p className="normal-font">New</p> : <p className="normal-font">{roundedAvg}</p>;
            //             return (
            //                 <NavLink key={spot?.id} className="spot-card" to={`/spots/${spot?.id}`}>
            //                     <img src={spot?.previewImage} alt={spot?.name} className="preview-image" onError={(e) => { e.target.onerror = null; }} />

            //                     <div className="location-rating">
            //                         <p>{spot?.city}, {spot?.state}</p>
            //                         {rating}
            //                     </div>
            //                     <div>${spot?.price} night</div>
            //                     <div className="update-delete">
            //                         <NavLink to={`/spots/${spot?.id}/edit`} className="reserve-btn">Update</NavLink>
            //                         <OpenModalButton buttonText={"Delete"} modalComponent={<DeleteSpotModal spotId={spot?.id} />} />
            //                     </div>
            //                 </NavLink>
            //             )
            //         })}
            //     </div>
            // </div>
