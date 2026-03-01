const express = require("express");
const router = express.Router();
const controller = require("../controllers/highlightsImagesController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/addimages", upload.single("image"), controller.addImage);
router.get("/getimages", controller.getAllImages);
router.get("/getoneimages/:id", controller.getSingleImage);
router.put("/editimages/:id", controller.updateImage);
router.delete("/delete*6mages/:id", controller.deleteImage);

module.exports = router;