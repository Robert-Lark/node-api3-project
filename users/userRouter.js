const express = require("express");

const router = express.Router();
const userDb = require("./userDb");
const postDb = require("../posts/postDb");
const {
	validateUserId,
	validateUser,
	validatePost,
} = require("../middleware/user");
//COMPLETED
router.post("/", validateUser(), (req, res) => {
	userDb
		.insert(req.body)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});
//completed
router.post("/:id/posts", validateUserId(), validatePost(), (req, res) => {
	postDb
		.insert({
			text: req.body.text,
			user_id: req.body.user_id,
		})
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

//COMPLETED
router.get("/", (req, res) => {
	userDb
		.get()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((error) => {
			res.status(404).json({ message: "does not exist" });
		});
});

//COMPLETED
router.get("/:id", validateUserId(), (req, res) => {
	userDb
		.getById(req.user)
		.then((response) => {
			res.status(200).json(req.user);
		})
		.catch((error) => {
			res
				.status(500)
				.json({ error: "The posts information could not be retrieved." });
		});
});

//COMPLETED
router.get("/:id/posts", validateUserId(), (req, res) => {
	userDb
		.getUserPosts(req.user)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res
				.status(500)
				.json({ error: "The posts information could not be retrieved." });
		});
});

//COMPLETED
router.delete("/:id", validateUserId(), (req, res) => {
	userDb
		.remove(req.user)
		.then((response) => {
			res.status(200).json({ message: "Deleted" });
		})
		.catch((error) => {
			console.log(error);
		});
});
//COMPLETED
router.put("/:id", validateUserId(), (req, res) => {
	userDb
		.update(req.user.id, { name: req.body.name })
		.then((response) => res.status(200).json(response))
		.catch((error) => {
			res.status(500).json({ error: "Could not update post." });
		});
});

module.exports = router;
