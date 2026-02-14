const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("../config/connectDB");
const authMiddleware = require("../middleware/authMiddleware");
const errorHandler = require("../middleware/errorHandler");
const validateRequest = require("../middleware/validateRequest");
const productRoutes = require("./products");
const authRoutes = require("./auth");
const bannerRoutes = require("./banner");
const categoryRoutes = require("./category");
const contactRoutes = require("./contact");

dotenv.config();

const app = express();

const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

//connect to mongoDB atlas
connectDB();

//use products routes
app.use("/api/products", productRoutes);

//use auth routes
app.use("/api/auth", authRoutes);
console.log("Auth routes registered");

//use banner route
app.use("/api/banners", bannerRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/contact", contactRoutes);

//use favourite route
/* app.use("/api/favourites", favouriteRoutes);
 */
//use error handling middleware
app.use(errorHandler);

//use validation middleware for routes that require validation
app.use("/validate", validateRequest);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
