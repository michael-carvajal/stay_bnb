import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getSpotDetails } from "../../store/spots"

const SpotDetail = () => {
    const { spotId } = useParams()
    const currentSpot = useSelector(state => state.spots[spotId])
    console.log(currentSpot);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpotDetails(spotId))
    }, [dispatch, spotId])
    return (
        <div>
            details for spot {spotId}
        </div>
    )
}
export default SpotDetail
