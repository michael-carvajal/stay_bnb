import { useState } from "react";
import { useDispatch } from "react-redux";
import { postReview } from "../../store/reviews";
import { useModal } from "../../context/Modal"
export default function ReviewModal({ spotId }) {
        const { closeModal } = useModal()
    console.log("spotId from props in review modal =====> ", spotId);
    const ratingObj = {};
    const dispatch = useDispatch()
    const [activeRating, setActiveRating] = useState(1)
    const [formErrors, setFormErrors] = useState({})
    const [review, setReview] = useState("")
    const onChange = (e) => {
        const value = e.target.getAttribute('data-value');
        console.log(value);
        setActiveRating(value)
        console.log(activeRating);
    }
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
            spotId
        }

        const response = await dispatch(postReview(reviewObj))
        if (response) {
            newErrors.exists = response.message
        }
        if (Object.values(newErrors).length > 0) {
            setFormErrors(newErrors)
            return
        }

        console.log("this is response from thunnk dispatch",  response);
        closeModal()
    }
    return (
        <form className="review-modal" onSubmit={handleSubmit}>
            <h1>How was your stay?</h1>
            {formErrors.exists && <p>{formErrors.exists}</p>}
            <textarea placeholder="Just a quick review." value={review} onChange={(e) => setReview(e.target.value)}></textarea>
            <div className="review-stats">

                <input
                    type="number"

                    value={activeRating}
                    onChange={onChange}
                    style={{ display: "none" }}
                />
                <div className="rating-input">
                    <i className={`${checkObj(1)} fa-star`} data-value="1" onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={onChange}></i>
                    <i className={`${checkObj(2)} fa-star`} data-value="2" onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={onChange}></i>
                    <i className={`${checkObj(3)} fa-star`} data-value="3" onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={onChange}></i>
                    <i className={`${checkObj(4)} fa-star`} data-value="4" onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={onChange}></i>
                    <i className={`${checkObj(5)} fa-star`} data-value="5" onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={onChange}></i> Starts
                </div>
                <button>Submit Your Review</button>
            </div>
        </form>
    )
}
