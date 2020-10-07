const express = require("express");

const router = express.Router();
const userDb = require("./userDb");
const {
	validateUserId,
	validateUser,
	validatePost,
} = require("../middleware/user");
//COMPLETED
router.post("/", (req, res) => {
	userDb
		.insert(req.body)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

router.post("/:id/posts", validateUserId(), validatePost(), (req, res) => {
  userDb
		.insert(req.body)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});


router.get("/", (req, res) => {
	userDb
		.get()
		.then(res.status(200).json({ message: "Welcome to the API" }))
		.catch(res.status(404).json({ message: "does not exist" }));
});

//COMPLETED
router.get("/:id", validateUserId(), (req, res) => {
  userDb
  .getById(req.user)
  .then((response) => {res.status(200).json(req.user)})
.catch((error) => {res.status(500).json({error: "The posts information could not be retrieved."})})  
});

//COMPLETED
router.get("/:id/posts", validateUserId(), (req, res) => {
  userDb
  .getUserPosts(req.user)
  .then((response) => {res.status(200).json(response)})
	.catch((error) => {res.status(500).json({error: "The posts information could not be retrieved."})});
});

//COMPLETED
router.delete("/:id", validateUserId(), (req, res) => {
	userDb
		.remove(req.user)
		.then((response) => {
			res.status(200).json({message: "Deleted"});
		})
		.catch((error) => {
			console.log(error);
		});
});

router.put("/:id", validateUserId(), (req, res) => {
	userDb.update(req.user, req.body).then(res.status(200));
});

module.exports = router;
