const express = require("express");
const router = express.Router();

router.get(`/api/Pre`, (req, res) => {
    res.send("Codigo-400")

})

module.exports = router;