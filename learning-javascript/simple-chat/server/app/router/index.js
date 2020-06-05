const express = require("express");
const publicIndex = require("./publicIndex");
const router = express.Router();

router.get("*", publicIndex); // covers any path

module.exports = router;