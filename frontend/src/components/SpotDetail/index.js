import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  useParams } from "react-router-dom/cjs/react-router-dom.min"
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

    const numberOfReviews = allReviews.length;
    const avgRating = currentSpot.avgStarRating;

    const ratingObj = {};

    for (let i = 1; i <= avgRating; i++) {
        // console.log(i);
        ratingObj[i] = i
    }
    // console.log(ratingObj);
    const checkObj = (place) => {
        if (ratingObj[place] !== undefined) {
            return "fas fa-star"
        } else {
            return "far fa-star"
        }
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
                        <div className="reserve-stats">

                            <i className={` ${checkObj(1)} `}></i>
                            <i className={` ${checkObj(2)} `}></i>
                            <i className={` ${checkObj(3)} `}></i>
                            <i className={` ${checkObj(4)} `}></i>
                            <i className={` ${checkObj(5)} `}></i>    <i className="fas fa-circle" style={{ color: "black", fontSize: "5px" }}></i>  {numberOfReviews} reviews
                        </div>
                    </div>
                    <a href="#" className="reserve-btn" onClick={() => alert("Feature Coming Soon...")}>Reserve</a>
                </div>
            </div>
            <div className="reviews">
                <div className="review-stats">

                    <i className={` ${checkObj(1)} `}></i>
                    <i className={` ${checkObj(2)} `}></i>
                    <i className={` ${checkObj(3)} `}></i>
                    <i className={` ${checkObj(4)} `}></i>
                    <i className={` ${checkObj(5)} `}></i>    <i className="fas fa-circle" style={{color:"black", fontSize:"5px"}}></i>  {numberOfReviews} reviews
                </div>
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
                        <div key={review.id} className="each-review">
                        <p>{review.User.firstName}</p>
                        <p className="review-date">{`${monthName} ${yearNumber}`}</p>
                            <p>{review.review}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default SpotDetail
