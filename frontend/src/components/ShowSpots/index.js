import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSpots } from "../../store/spots";
import './ShowSpots.css'
import missingImage from "../../assets/images/no-photo.jpeg"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
export const ShowSpots = () => {
    const dispatch = useDispatch();
    let allSpots = useSelector(state => state.spots.allSpots);
    console.log(allSpots);
    useEffect(() => {
        console.log(1);
        dispatch(getAllSpots())
    }, [dispatch])

    allSpots = !allSpots ? null : Object.values(allSpots).map(spot => spot)
    if (!allSpots || !Array.isArray(allSpots)) {
        console.log("allSpots is undefined");
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <div className="show-spots">
            {allSpots?.map((spot, index) => {
                // console.log(spot?.id);
                const roundedAvg = spot?.avgRating
                const rating = spot?.avgRating === null ? <p className="normal-font">New</p> : <p className="normal-font">{roundedAvg}</p>;
                return (
                    <NavLink key={spot.id} className="spot-card" to={`/spots/${spot?.id}` }>
                        <img src={spot?.previewImage} alt={spot?.name} className="preview-image" onError={(e) => { e.target.onerror = null; e.target.src = missingImage; }} />

                        <div className="location-rating ">
                            <p className="normal-font">{spot?.city}, {spot?.state}</p>
                        {rating}
                        </div>
                        <div className="normal-font"><p className="reserve-price"> ${spot?.price}</p> night</div>

                    </NavLink>
                )
            })}
        </div>
    )
}

export default ShowSpots
