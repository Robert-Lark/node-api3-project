const userDb = require("../users/userDb")

//custom middleware

function validateUserId() {
	return (req, res, next) => {
userDb.getById(req.params.id)
.then((user) => {
    if (user) {
        next()
    } else {
        res.status(404).json({
            message: "User not found",
        })
    }
})
.catch((error) => {
    res.status(500).json({
        message: "Error retrieving the user"
    })
})
    }
}

function validateUser(req, res, next) {
	// do your magic!
}

function validatePost(req, res, next) {
	// do your magic!
}

module.exports = {
    validateUserId,
}
