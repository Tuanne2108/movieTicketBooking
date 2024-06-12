const express = require("express");
const router = express.Router();
const showController = require("../Controllers/ShowController");

//Request
router.get("/create-show", showController.createShow)
router.get("/get-all-shows", showController.getShows);
router.get("/get-show/:id", showController.getShowById);
router.put("/update-show/:id", showController.updateShow);


module.exports = router;
