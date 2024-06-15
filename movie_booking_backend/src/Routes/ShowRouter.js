const express = require("express");
const router = express.Router();
const showController = require("../Controllers/ShowController");

//Request
router.post("/create-show", showController.createShow)
router.get("/get-all-shows", showController.getAllShows);
router.get("/get-show/:id", showController.getShowById);
router.put("/update-show/:id", showController.updateShow);
router.delete("/delete-show/:id", showController.deleteShow);


module.exports = router;
