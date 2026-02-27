const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Create a new order (Authenticated users can create, or guest with details)
router.post("/", authMiddleware, orderController.createOrder);

// Get all orders (Admin only)
router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  orderController.getAllOrders,
);

// Get user's orders (Authenticated users)
router.get("/my-orders", authMiddleware, orderController.getMyOrders);

// Get single order by ID (Admin only)
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  orderController.getOrderById,
);

// Check if user can review a product
router.get("/can-review/:productId", authMiddleware, orderController.canReview);

// Update order status (Admin only)
router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  orderController.updateOrderStatus,
);

// Mark order as valid/invalid (Admin only)
router.put(
  "/:id/valid",
  authMiddleware,
  adminMiddleware,
  orderController.updateOrderValidity,
);

// Mark order as reviewed
router.put(
  "/:orderId/reviewed",
  authMiddleware,
  orderController.markAsReviewed,
);

module.exports = router;
