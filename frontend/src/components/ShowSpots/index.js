import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSpots } from "../../store/spots";
import './ShowSpots.css'
import missingImage from "../../assets/images/no-photo.jpeg"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
export  const ShowSpots = () => {
    const dispatch = useDispatch();
    const allSpots = useSelector(state => {
        return Object.values(state.spots).map(spot => spot);
    });
    // console.log(allSpots);
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    // if (!allSpots) {
    //     console.log("allSpots is undefined");
    //     return (
    //         <h1>Loading...</h1>
    //     )
    // }
    return (
        <div className="show-spots">
            {allSpots.map((spot, index) => {
                // console.log(spot?.id);
                return (
                    <NavLink key={ index} className="spot-card" to={`/spots/${spot?.id}`}>
                        <img src={spot?.previewImage} alt={spot?.name} className="preview-image" onError={(e) => { e.target.onerror = null; e.target.src = missingImage; }} />

                        <div className="location-rating">
                            <p>{spot?.city}, {spot?.state}</p>
                            <p>{spot?.avgRating}</p>
                        </div>
                        <div>${spot?.price} night</div>

                    </NavLink>
                )
            })}
    </div>
)
}

export default ShowSpots
