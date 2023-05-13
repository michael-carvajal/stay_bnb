import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviews, postReview, putReview } from "../../store/reviews";
import { useModal } from "../../context/Modal"
import { getSpotDetails } from "../../store/spots";
import { fetchUser, restoreUser } from "../../store/session";
export default function ReviewModal({ spotId, buttonType, reviewId, spotName, currentReview }) {
    // console.log("this is the current review==========> ", currentReview);
    const { closeModal } = useModal()
    // console.log("spotId from props in review modal =====> ", spotId);
    const ratingObj = {};
    const dispatch = useDispatch()
    const [activeRating, setActiveRating] = useState(1)
    const [formErrors, setFormErrors] = useState({})
    const [review, setReview] = useState(currentReview?.review||"")
    const [btnDisable, setBtnDisable] = useState(true)
    const [booleanTen, setBooleanTen] = useState("disable-btn")
    const currentUser = useSelector(state => state.session)
    const onChange = (e) => {
        const value = e.target.getAttribute('data-value');
        console.log(value);
        setActiveRating(value)
        console.log(activeRating);
    }

    const textOverTen = () => {
        // console.log("text over tejn -==========>", review.length);
        if (review.length < 10) {
            setBooleanTen("disable-btn")
            return true
        } else {

            setBooleanTen("")
            return false
        }
    }

    useEffect(() => {
        if (textOverTen()) {
            setBtnDisable(true)
        } else {
            setBtnDisable(false)
        }
    }, [textOverTen])

    for (let i = 1; i <= activeRating; i++) {
        // console.log(i);
        ratingObj[i] = i
    }
    // console.log(ratingObj);
    const checkObj = (place) => {
        if (ratingObj[place] !== undefined) {
            return "fas"
        } else {
            return "far"
        }
    }
    const mouseOver = (e) => {
        // if (disabled) {
        //     return
        // }
        const value = e.target.getAttribute('data-value');
        // or: const value = e.target.dataset.value;
        // console.log(value);
        setActiveRating(value);
    }
    const mouseLeave = (e) => {
        // if (disabled) {
        //     return
        // }
        setActiveRating(activeRating)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        const reviewObj = {
            review: review,
            stars: activeRating,
            spotId,
            user: currentUser
        }

        const response = await dispatch(postReview(reviewObj))
        await dispatch(getSpotDetails(spotId))
        await dispatch(fetchUser())
        if (response) {
            newErrors.exists = response.message
        }
        if (Object.values(newErrors).length > 0) {
            setFormErrors(newErrors)
            return
        }

        console.log("this is response from thunnk dispatch", response);
        closeModal()
    }
    const updateReview = async (e) => {
        e.preventDefault();
        const newErrors = {};
        const reviewObj = {
            review: review,
            stars: activeRating,
            spotId,
            user: currentUser
        }

        const response = await dispatch(putReview(reviewObj, currentReview.id))
        await dispatch(getSpotDetails(spotId))
        await dispatch(fetchUser())
        dispatch(getUserReviews())
        if (response) {
            newErrors.exists = response.message
        }
        if (Object.values(newErrors).length > 0) {
            setFormErrors(newErrors)
            return
        }

        console.log("this is response from thunnk dispatch", response);
        closeModal()
    }
    return (buttonType === "update" ?
        <form className="review-modal" onSubmit={updateReview}>
            <h1 style={{textAlign:"center"}}>How was your stay at
                <br />
                {spotName}
            </h1>

            {formErrors.exists && <span>{formErrors.exists}</span>}
            <textarea placeholder="Leave your review here..." value={review} rows="7" cols={40} onChange={(e) => setReview(e.target.value)}></textarea>
            <div className="review-stats">

                <input
                    type="number"

                    value={activeRating}
                    onChange={onChange}
                    style={{ display: "none" }}
                />
                <div className="rating-input">
                    <div className="review-modal-stars">

                        <i className={`${checkObj(1)} fa-star`} data-value="1" onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={onChange}></i>
                        <i className={`${checkObj(2)} fa-star`} data-value="2" onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={onChange}></i>
                        <i className={`${checkObj(3)} fa-star`} data-value="3" onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={onChange}></i>
                        <i className={`${checkObj(4)} fa-star`} data-value="4" onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={onChange}></i>
                        <i className={`${checkObj(5)} fa-star`} data-value="5" onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={onChange}></i>
                    </div>
                    <p>Stars</p>
                </div>
            </div>
            <button disabled={btnDisable} className={`reserve-btn submit-review ${booleanTen}`}>Submit Your Review</button>
        </form>
        : <form className="review-modal" onSubmit={handleSubmit}>
            <h1>How was your stay?</h1>
            {formErrors.exists && <span>{formErrors.exists}</span>}
            <textarea placeholder="Leave your review here..." value={review} rows="7" cols={40} onChange={(e) => setReview(e.target.value)}></textarea>
            <div className="review-stats">

                <input
                    type="number"

                    value={activeRating}
                    onChange={onChange}
                    style={{ display: "none" }}
                />
                <div className="rating-input">
                    <div className="review-modal-stars">

                        <i className={`${checkObj(1)} fa-star`} data-value="1" onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={onChange}></i>
                        <i className={`${checkObj(2)} fa-star`} data-value="2" onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={onChange}></i>
                        <i className={`${checkObj(3)} fa-star`} data-value="3" onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={onChange}></i>
                        <i className={`${checkObj(4)} fa-star`} data-value="4" onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={onChange}></i>
                        <i className={`${checkObj(5)} fa-star`} data-value="5" onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={onChange}></i>
                    </div>
                    <p>Stars</p>
                </div>
            </div>
            <button disabled={btnDisable} className={`reserve-btn submit-review ${booleanTen}`}>Submit Your Review</button>
        </form>

    )
}
