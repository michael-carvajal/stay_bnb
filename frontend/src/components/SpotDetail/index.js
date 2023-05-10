import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getSpotDetails } from "../../store/spots"
import missingImage from "../../assets/images/no-photo.jpeg"
import ReviewModal from "./ReviewModal"
import './SpotDetail.css'
import { fetchReview, deleteReview } from "../../store/reviews"
import OpenModalButton from "../OpenModalButton"

const SpotDetail = () => {
    const { spotId } = useParams()
    const currentSpot = useSelector(state => state.spots[spotId])
    const currentUser = useSelector(state => state.session)
    let {spot} = useSelector(state => state.reviews)

    let allReviews = !spot ? null : Object.values(spot).map(review => review)
    console.log("allReviews from spot detail ===========>   ", allReviews);
    const previewImage = currentSpot?.SpotImages?.find(image => {
        if (image.preview === true) {
            return image.url
        }
    })

    const restOfImages = currentSpot?.SpotImages?.filter(image => image.preview === false)
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(fetchReview(spotId));
                dispatch(getSpotDetails(spotId));
                // console.log("This is the review response ====>");

                // console.log("this is the respinse  ====>", response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [dispatch, spotId]);
    // console.log("this is theallReviews from use seleector ====>", allReviews);
    // console.log("These are all the reviews in an array ==================>", allReviews);
    if (!currentSpot || !restOfImages || !allReviews) {
        console.log("allSpots is undefined");
        return (
            <h1>Loading...</h1>
        )
    }

    const numberOfReviews = allReviews?.length;
    const avgRating = currentSpot?.avgStarRating;
    const visibleImages = [];
    const ratingObj = {};
    for (let i = 0; i <= 3; i++) {
        const element = restOfImages[i];
        if (!element) {
            visibleImages.push("")
        } else {
            visibleImages.push(element)
        }

    }
    let reviewsAvailable = allReviews?.length > 0 ? true : false;
    // console.log("this is allreviews . length =>   ", reviewsAvailable);

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
    const removeReview = (e) => {
        const reviewId = e.target.value;
        dispatch(deleteReview(reviewId))
    }
//     {/* <img id="detail-img1" src={restOfImages[0]?.url} alt={currentSpot.name} onError = {(e) => { e.target.onerror = null; e.target.src = missingImage; }}/>
// <img id="detail-img2" src={restOfImages[1]?.url} alt={currentSpot.name} onError = {(e) => { e.target.onerror = null; e.target.src = missingImage; }}/>
// <img id="detail-img3" src={restOfImages[2]?.url} alt={currentSpot.name} onError = {(e) => { e.target.onerror = null; e.target.src = missingImage; }}/>
// <img id="detail-img4" src={restOfImages[3]?.url} alt={currentSpot.name} onError = {(e) => { e.target.onerror = null; e.target.src = missingImage; }}/> */}
    return (
        <div className="spot-detail">
            <h1>{currentSpot.name}</h1>
            <div>{currentSpot.city}, {currentSpot.state} {currentSpot.country}</div>
            <div className="image-container">
                <img id="detail-img0" src={previewImage.url} alt={currentSpot.name} onError={(e) => { e.target.onerror = null; e.target.src = missingImage; }} />

                <div className="sub-images">
                    {
                        visibleImages.map((image, index) => <img key={index} src={`${image.url}${Math.random()}`} alt={currentSpot.name} onError={(e) => { e.target.onerror = null; e.target.src = missingImage; }} />)
                    }
                </div>
            </div>
            <div className="description">
                <div className="host-description">
                    <h2>Hosted by {currentSpot.Owner.firstName} {currentSpot.Owner.lastName}</h2>
                    <p>{currentSpot.description}</p>
                </div>
                <div className="price-rating">
                    <div className="price-review">
                        <p>${currentSpot.price} night</p>
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
                    <i className={` ${checkObj(5)} `}></i>    <i className="fas fa-circle" style={{ color: "black", fontSize: "5px" }}></i>  {numberOfReviews} reviews
                </div>
                <OpenModalButton className="reserve-btn" buttonText={"Post Your Review"} modalComponent={<ReviewModal spotId={spotId} />} />
                {!reviewsAvailable ?
                    <div>

                        <p>Be the first to post a review!</p>
                    </div>
                    :
                    allReviews.map(review => {
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

                        // console.log(monthName, dayNumber, yearNumber);
                        // console.log("this is the review inside of map =====> ", review.userId);
                        // console.log("this is the current user inside of map =====> ", currentUser);
                        // console.log("this is the current user ================> ", currentUser.user.id);
                        // console.log(review.User?.id === currentUser.user?.id || currentUser.user?.firstName === review.User?.firstName);
                        return (
                            <div key={review?.id} className="each-review">
                                <p>{review.user?.firstName || review.User?.firstName}</p>
                                <p className="review-date">{`${monthName} ${yearNumber}`}</p>
                                <p>{review.review}</p>
                                {review?.userId === currentUser.user?.id || currentUser.user?.firstName === review.User?.firstName ?
                                    <button onClick={removeReview} value={review.id}>Delete</button> : null}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
export default SpotDetail
