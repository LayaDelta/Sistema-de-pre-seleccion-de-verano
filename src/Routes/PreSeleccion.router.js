const express = require("express");
const router = express.Router();
const controller = require("../Controllers/AdminControllers")

router.get(`/Administrador`, controller.index)
router.get("/estudiante/:id", controller.editID)
router.post("/estudiante/:id", controller.SubmitId)
router.post("/eliminar/:id", controller.eliminar);

module.exports = router;