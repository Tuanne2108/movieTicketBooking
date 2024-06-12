const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
// const {
//   authMiddleware,
//   authUserMiddleware,
// } = require("../Middlewares/authMiddle");

//Request
router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
// router.post("/update-user/:id", userController.updateUser);
router.post("/refresh-token", userController.getRefreshToken);
router.post("/logout", userController.logOutUser);

// router.get("/get-user/:id", authUserMiddleware, userController.getUser);
// router.get("/get-all-users", authMiddleware, userController.getAllUsers);
// router.delete("/delete-user/:id", authMiddleware, userController.deleteUser);

module.exports = router;
