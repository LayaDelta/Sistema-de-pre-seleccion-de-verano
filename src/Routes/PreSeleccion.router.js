const express = require("express");
const router = express.Router();
const controller = require("../Controllers/AdminControllers")

router.get(`/Administrador`, controller.index  )
router.get("/actualizar/:id", controller.editID)

module.exports = router;