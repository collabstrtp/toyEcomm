const express = require("express");
const router = express.Router();
const controller = require("../controllers/highlightsImagesController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/addimages",authMiddleware, adminMiddleware, upload.single("image"), controller.addImage);
router.get("/getimages", authMiddleware, adminMiddleware, controller.getAllImages);
router.get("/getoneimages/:id", authMiddleware, adminMiddleware, controller.getSingleImage);
router.put("/editimages/:id", authMiddleware, adminMiddleware, controller.updateImage);
router.delete("/deleteimages/:id", authMiddleware, adminMiddleware, controller.deleteImage);

module.exports = router;