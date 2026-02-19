const redirectToWhatsApp = (product, user = null) => {
  // WhatsApp Business number (Vite env)
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "917325860606";

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

  window.open(whatsappUrl, "_blank");
};

export default redirectToWhatsApp;
