const userDb = require("../users/userDb");

//custom middleware

function validateUserId(req, res, next) {
	return (req, res, next) => {
		userDb
			.getById(req.params.id)
			.then((user) => {
				if (user) {
					req.user = user;
					next();
				} else {
					res.status(404).json({
						message: "User not found",
					});
				}
			})
			.catch((error) => {
				res.status(500).json({
					message: "Error retrieving the user",
				});
			});
	};
}

function validateUser(req, res, next) {
	return (req, res, next) => {
		if (!req.body) {
			return res.status(400).json({
				message: "missing user data",
			});
		} else if (!req.body.name) {
			return res.status(400).json({
				message: "missing required name field",
			});
		}
		next();
	};

	//     validatePost validates the body on a request to create a new post
	// if the request body is missing, cancel the request and respond with status 400 and { message: "missing post data" }
	// if the request body is missing the required text field, cancel the request and respond with status 400 and { message: "missing required text field" }
}
function validatePost(req, res, next) {
	return (req, res, next) => {
		if (!req.body) {
			return res.status(400).json({
				message: "missing post data",
			});
		} else if (!req.body.text) {
			return res.status(400).json({
				message: "missing required text field",
			});
		}
		next();
	};
}

module.exports = {
	validateUserId,
    validateUser,
    validatePost
};
