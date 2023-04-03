const express = require("express");
const router = express.Router();
const {signup,signin, satyam} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middlewares")
// User route
router.post("/signup", signup);
router.post("/sigin", signin);
router.get("/satyam", authMiddleware,satyam);

module.exports =  router;