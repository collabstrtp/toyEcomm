const nodemailer = require("nodemailer");

// Create transporter (configure with your email service)
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail", // or your email service
    auth: {
      user: process.env.EMAIL_USERNAME || "your-email@gmail.com",
      pass: process.env.EMAIL_PASSWORD || "your-app-password",
    },
  });
};

const sendReviewEmail = async (order, product) => {
  try {
    const transporter = createTransporter();

    const productName = product?.name || "the product";
    const reviewLink = `${process.env.CLIENT_URL}/product/${order.product}?orderId=${order._id}&review=true`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Thank you for your purchase! 🧸</h2>
        
        <p>Dear ${order.customerName},</p>
        
        <p>We hope you enjoy <strong>${productName}</strong>!</p>
        
        <p>We'd love to hear your thoughts. Please take a moment to share your experience:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${reviewLink}" style="background-color: #007BFF; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Write a Review
          </a>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          This review link is only valid for your order. Only customers who have purchased 
          this product can leave a review.
        </p>
        
        <p style="color: #666; font-size: 14px;">
          Thank you for shopping with us!<br>
          The Return Treasure Team
        </p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USERNAME || "your-email@gmail.com",
      to: order.customerEmail,
      subject: `Share your experience with ${productName}!`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Review email sent to ${order.customerEmail}`);
    return true;
  } catch (error) {
    console.error("Error sending review email:", error);
    return false;
  }
};

module.exports = sendReviewEmail;
