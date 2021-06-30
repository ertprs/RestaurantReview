import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            console.log("request body")
            console.log(req.body)
            const restaurantId = req.body.restaurant_id
            console.log("res id")
            console.log(restaurantId)
            const review = req.body.text
            console.log("review")
            console.log(review)
            const userInfo= {
                name: req.body.name,
                _id: req.body.user_id,
            }
            const date = new Date()

            const reviewResponse = await ReviewsDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date
            )
            return res.status(200).json({status: "Post Success"})
        } catch(e) {
            return res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id
            const text = req.body.text
            const date = new Date()
            
            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                text,
                date
            )
            if(reviewResponse) {
                return res.status(400).json({error})
            }

            if(reviewResponse.modifiedCount === 0) {
                throw new Error(
                    "Unable to update the review: " + reviewId
                )
            }

            return res.status(200).json({status: "Update Success"})
        } catch(e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.query.id
            const userId = req.query.user_id
            console.log("reviewId")
            console.log(reviewId)
            console.log("user id")
            console.log(userId)

            const reviewResponse = await ReviewsDAO.deleteReview(reviewId, userId)
            return res.status(200).json({status: "Delete Sucess"})
        } catch(e) {
            return res.status(500).json({error: e.message})
        }
    }
}