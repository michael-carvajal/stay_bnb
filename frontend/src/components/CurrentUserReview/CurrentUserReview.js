import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserReviews } from "../../store/reviews";

export default function CurrentUserReview() {
    const dispatch = useDispatch();
    const { session } = useSelector(state => state)
    const user = session?.user;

    useEffect(() => {
        dispatch(getUserReviews())
    }, [dispatch])


    return (
        <div className="manage-spots">
            <div className="manage-heading">
                <h1>Manage Your Spots</h1>
            </div>
            <div className="current-spots">

            </div>
        </div>
    )
}
