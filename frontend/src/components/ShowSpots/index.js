import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSpots } from "../../store/spots";
import './ShowSpots.css'
export  const ShowSpots = () => {
    const dispatch = useDispatch();
    const allSpots = useSelector(state => {
        return Object.values(state.spots).map(spot => spot);
    });
    console.log(allSpots);
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])
    return (
        <div className="show-spots">
            {allSpots.map(spot => {
                return (
                    <div key={spot.id} className="spot-card">
                        <img src={ spot.previewImage} className="preview-image"/>
                        <div>
                            <p>{spot.city}, {spot.state}</p>
                            <p>{spot.rating}</p>
                        </div>
                        <div>${spot.price} night</div>
                    </div>
                )
            })}
    </div>
)
}

export default ShowSpots
