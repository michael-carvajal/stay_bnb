import { useEffect, useState } from "react"
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
    let currentSpot = useSelector(state => state.spots)
    currentSpot = currentSpot[spotId]
    let { session } = useSelector(state => state)
    const currentUser = session
    // console.log("this is the current user ====================>", currentUser);
    let { spot } = useSelector(state => state.reviews)

    let allReviews = !spot ? null : Object.values(spot).map(review => review)
    // console.log("allReviews from spot detail ===========>   ", allReviews);
    const previewImage = currentSpot?.SpotImages?.find(image => {
        if (image.preview === true) {
            return image.url
        }
    })

    const restOfImages = currentSpot?.SpotImages?.filter(image => image.preview === false)
    const dispatch = useDispatch();

    const [didUserPost, setDidUserPost] = useState(false)
    useEffect(() => {

        async function getDetails() {
            await dispatch(getSpotDetails(spotId));
            await dispatch(fetchReview(spotId));

        }
        getDetails()

    }, [dispatch]);
    // console.log("this is theallReviews from use seleector ====>", allReviews);
    console.log("These are all the reviews in an array ==================>", allReviews);
    if (!currentSpot || !restOfImages || !allReviews || !currentUser) {
        console.log("allSpots is undefined");
        return (
            <h1>Loading...</h1>
        )
    }
    console.log("current user is  ===================>", currentUser);
    allReviews.forEach(review => {
        if (review.User?.id === currentUser.user?.id) {
            // setDidUserPost(true)
        }
    });

    const ownerOfSpot = didUserPost ? null : (
        <div className="post-review">
            <OpenModalButton buttonText={"Post Your Review"} modalComponent={<ReviewModal spotId={spotId} />} />
            <p>Be the first to post a review!</p>
        </div>
    )
    const renderPostReview = currentUser.user?.id === currentSpot.ownerId ? null : ownerOfSpot;


    const numberOfReviews = allReviews?.length;
    const reviewRender = (reviewsLength, size) => {
        if (size === "small") {
            if (reviewsLength > 0) {
                return (<div className="reserve-stats">

                    <i className={` ${checkObj(1)} `}></i>
                    <i className={` ${checkObj(2)} `}></i>
                    <i className={` ${checkObj(3)} `}></i>
                    <i className={` ${checkObj(4)} `}></i>
                    <i className={` ${checkObj(5)} `}></i>    <i className="fas fa-circle" style={{ color: "black", fontSize: "5px" }}></i>  {numberOfReviews} reviews
                </div>)
            } else {
                return (<div className="reserve-stats">

                    <i className={`fas fa-star`} ></i> <p className="new">New</p>
                </div>)
            }

        } else {
            if (reviewsLength > 0) {
                return (<div className="reserve-stats" id="stars">

                    <i className={` ${checkObj(1)} `}></i>
                    <i className={` ${checkObj(2)} `}></i>
                    <i className={` ${checkObj(3)} `}></i>
                    <i className={` ${checkObj(4)} `}></i>
                    <i className={` ${checkObj(5)} `}></i>    <i className="fas fa-circle" style={{ color: "black", fontSize: "5px" }}></i>

                    <p>{numberOfReviews} reviews</p>
                </div>)
            } else {
                return (<div className="reserve-stats" id="stars">

                    <i className={`fas fa-star`} ></i>
                    <p className="new">New</p>
                </div>)
            }

        }
    }

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
        dispatch(getSpotDetails(spotId))
    }
    //     {/* <img id="detail-img1" src={restOfImages[0]?.url} alt={currentSpot.name} onError = {(e) => { e.target.onerror = null; e.target.src = missingImage; }}/>
    // <img id="detail-img2" src={restOfImages[1]?.url} alt={currentSpot.name} onError = {(e) => { e.target.onerror = null; e.target.src = missingImage; }}/>
    // <img id="detail-img3" src={restOfImages[2]?.url} alt={currentSpot.name} onError = {(e) => { e.target.onerror = null; e.target.src = missingImage; }}/>
    // <img id="detail-img4" src={restOfImages[3]?.url} alt={currentSpot.name} onError = {(e) => { e.target.onerror = null; e.target.src = missingImage; }}/> */}
    return (
        <div className="spot-detail">
            <h1 className="spot-name">{currentSpot.name}</h1>
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
                        <p><label className="reserve-price">${currentSpot.price}</label> night</p>
                        {reviewRender(numberOfReviews, "small")}
                    </div>
                    <a href="#" className="reserve-btn" onClick={() => alert("Feature Coming Soon...")}>Reserve</a>
                </div>
            </div>
            <div className="reviews">
                {reviewRender(numberOfReviews, "big")}
                {renderPostReview}
                {
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
                        // console.log("this is the review inside of map =====> ", review);
                        // console.log("this is the current user inside of map =====> ", currentUser);
                        const userId = currentUser.user?.id
                        const reviewOwnerId = review.user?.id || review.User?.id
                        // console.log(userId, reviewOwnerId);
                        // console.log("this is the current user ================> ", currentUser.user.id);
                        // console.log(review.User?.id === currentUser.user?.id || currentUser.user?.firstName === review.User?.firstName);
                        // console.log(userId === reviewOwnerId);

                        return (
                            <div key={review?.id} className="each-review">
                                <p>{review.user?.firstName || review.User?.firstName}</p>
                                <p className="review-date">{`${monthName} ${yearNumber}`}</p>
                                <p>{review.review}</p>
                                {userId === reviewOwnerId ?
                                    <button onClick={removeReview} className="smaller-btn" id="delete-review" value={review.id}>Delete</button> : null}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
export default SpotDetail
