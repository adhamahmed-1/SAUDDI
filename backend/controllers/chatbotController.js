exports.chatbotReply = async (req, res) => {
  const { message, bookingId } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Message is required" });
  }

  let reply = "I'm here to help!";

  const msg = message.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi")) {
    reply = "Hello 👋 How can I assist you today?";
  } else if (msg.includes("booking")) {
    reply = "Please share your Booking ID (CRY-XXXXXXX) to check status.";
  } else if (msg.includes("status")) {
    reply = bookingId
      ? `🔎 Checking status for booking ID: ${bookingId}`
      : "Please enter your booking ID first.";
  } else if (msg.includes("help")) {
    reply = "You can ask about booking, status, or general queries.";
  }

  res.json({ reply });
};
