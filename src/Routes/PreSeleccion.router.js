const express = require("express");
const router = express.Router();
const controller = require("../Controllers/AdminControllers")

router.get(`/Administrador`, controller.index  )
router.get("/:id", controller.editID)
router.post("/:id", controller.SubmitId)

module.exports = router;