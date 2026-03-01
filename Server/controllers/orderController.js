const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const sendReviewEmail = require("../utils/emailService");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      productId,
      quantity,
      price,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
    } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find user by email (if logged in)
    let user = null;
    if (req.user && req.user._id) {
      user = await User.findById(req.user._id);
    }

    const order = new Order({
      user: user ? user._id : null,
      product: productId,
      quantity: quantity || 1,
      price: price,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress: shippingAddress || "",
      status: "pending",
    });

    await order.save();

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email number")
      .populate("product", "name images price")
      .sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Get all orders error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get user's orders
exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId })
      .populate("product", "name images price")
      .sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Get my orders error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const validStatuses = ["pending", "approved", "shipped", "delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    // If status is delivered, send review email
    if (status === "delivered" && !order.reviewSent) {
      try {
        await sendReviewEmail(order, order.product);
        order.reviewSent = true;
        await order.save();
      } catch (emailError) {
        console.error("Error sending review email:", emailError);
        // Don't fail the request if email fails
      }
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Check if user can review a product
exports.canReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const order = await Order.findOne({
      user: userId,
      product: productId,
      status: "delivered",
      reviewed: false,
    });

    if (order) {
      return res.status(200).json({ canReview: true, orderId: order._id });
    } else {
      return res.status(200).json({ canReview: false, orderId: null });
    }
  } catch (error) {
    console.error("Check review eligibility error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Mark order as reviewed
exports.markAsReviewed = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.reviewed = true;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order marked as reviewed",
    });
  } catch (error) {
    console.error("Mark as reviewed error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get single order by ID (Admin)
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("user", "name email number")
      .populate("product", "name images price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ order });
  } catch (error) {
    console.error("Get order by ID error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Delete order (Admin)
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Delete order error:", error);
    return res.status(500).json({ message: error.message });
  }
};
