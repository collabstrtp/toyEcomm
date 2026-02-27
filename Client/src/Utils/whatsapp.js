import axios from "axios";

const redirectToWhatsApp = async (product, user = null) => {
  // WhatsApp Business number (Vite env)
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "917325860606";
  const BASE_URL =
    import.meta.env.VITE_APP_SERVER_BASE_URL || "http://localhost:8080";

  const productName = product?.name || "this product";
  const productPrice = product?.price
    ? `₹${product.price.toFixed(2)}`
    : "Please share price";

  const productUrl = product?.id
    ? `${window.location.origin}/product/${product.id}`
    : "";

  const productImage = product?.image || "";

  // Include user information if available
  const userInfo = user
    ? `

👤 Customer Details:
📧 Email: ${user.email || "Not provided"}
📱 Phone: ${user.number || "Not provided"}
👤 Name: ${user.name || "Not provided"}
`
    : "";

  const message = `
Hello 👋

I'm interested in the following product:

🧸 Product: ${productName}
💰 Price: ${productPrice}
${productUrl ? `${productUrl}` : ""}
${userInfo}

Could you please share delivery details?

`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message.trim(),
  )}`;

  // Create order in backend if user is logged in
  if (user && product?.id) {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/api/orders`,
        {
          productId: product.id,
          quantity: product.quantity || 1,
          price: product.price,
          customerName: user.name || "Customer",
          customerEmail: user.email || "",
          customerPhone: user.number || "",
          shippingAddress: "",
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      console.log("Order created successfully");
    } catch (error) {
      console.error("Error creating order:", error);
      // Continue to WhatsApp even if order creation fails
    }
  }

  window.open(whatsappUrl, "_blank");
};

export default redirectToWhatsApp;
