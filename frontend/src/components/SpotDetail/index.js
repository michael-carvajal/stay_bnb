import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getSpotDetails } from "../../store/spots"
import missingImage from "../../assets/images/no-photo.jpeg"

import './SpotDetail.css'
const SpotDetail = () => {
    const { spotId } = useParams()
    const currentSpot = useSelector(state => state.spots[spotId])
    console.log("current spot form use selector",currentSpot);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpotDetails(spotId))
    }, [dispatch, spotId])
    return (
        <div className="spot-detail">
            <h1>{currentSpot?.name}</h1>
            <div>{currentSpot?.city}, {currentSpot?.state} {currentSpot?.country}</div>
            <div className="image-container">
                <img id="detail-img0" src={""} alt={currentSpot.name} onError = {(e) => { e.target.onerror = null; e.target.src = missingImage; }}/>

                <div className="sub-images">
                <img id="detail-img1" src={""} alt={currentSpot.name} onError = {(e) => { e.target.onerror = null; e.target.src = missingImage; }}/>
                <img id="detail-img2" src={""} alt={currentSpot.name} onError = {(e) => { e.target.onerror = null; e.target.src = missingImage; }}/>
                <img id="detail-img3" src={""} alt={currentSpot.name} onError = {(e) => { e.target.onerror = null; e.target.src = missingImage; }}/>
                <img id="detail-img4" src={""} alt={currentSpot.name} onError = {(e) => { e.target.onerror = null; e.target.src = missingImage; }}/>

                </div>
            </div>
            <div></div>
            <div></div>
        </div>
    )
}
export default SpotDetail
