import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getSpotDetails } from "../../store/spots"
import missingImage from "../../assets/images/no-photo.jpeg"

import './SpotDetail.css'
import { fetchReview } from "../../store/reviews"
const SpotDetail = () => {
    const { spotId } = useParams()
    const currentSpot = useSelector(state => state.spots[spotId])
    const allReviews = useSelector(state => Object.values(state.reviews).map(review => review))
    console.log("current review form use selector",allReviews);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpotDetails(spotId))
        dispatch(fetchReview(spotId))
    }, [dispatch, spotId])
    if (!currentSpot) {
        console.log("allSpots is undefined");
        return (
            <h1>Loading...</h1>
        )
    }
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
            <div className="description">
                <div className="host-description">
                    <h2>Hosted by {currentSpot.Owner?.firstName} {currentSpot.Owner?.lastName}</h2>
                    <p>{currentSpot?.description}</p>
                </div>
                <div className="price-rating">
                    <div className="price-review">
                        <p>${currentSpot?.price} night</p>
                        <p>{currentSpot?.avgRating}  # of reviews coming soon</p>
                    </div>
                    <a className="reserve-btn" onClick={() => alert("Feature Coming Soon...")}>Reserve</a>
                </div>
            </div>
            <div className="reviews">
                {allReviews.map(review => {
                    const date = new Date(review.updatedAt);

                    // Get the name of the month
                    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
                    const monthName = monthNames[date.getMonth()];

                    // Get the number of the day
                    const dayNumber = date.getDate();

                    // Get the number of the year
                    const yearNumber = date.getFullYear();

                    console.log(monthName, dayNumber, yearNumber);

                    return (
                        <div key={review.id}>
                        <p>{review.User.firstName}</p>
                        <p>{`${monthName} ${yearNumber}`}</p>
                            <p>{review.review}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default SpotDetail
