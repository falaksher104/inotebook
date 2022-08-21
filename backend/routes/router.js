const connectDB = require("../connection/db");
const apiGet = require("./api/get");
const apiPost = require("./api/post");
const router = require("express").Router();



router.use(apiGet);
router.use(apiPost);

module.exports = router;