const express = require("express");
const router = express.Router();

const controller = require("../Controllers/MainControllers")

router.get(`/`, controller.index)
router.post("/Cargar", controller.submit)

module.exports = router;