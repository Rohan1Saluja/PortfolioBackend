// api/controllers/contactController.js
const transporter = require("../services/mailer"); // Import the configured transporter

const handleContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  // Basic Server-Side Validation
  if (!name || !email) {
    // Use return to stop execution
    return res
      .status(400)
      .json({ success: false, message: "Name and Email are required." });
  }
  // Add more validation if needed (e.g., email format check)

  // Email Options
  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: process.env.EMAIL_TO,
    subject: `New Contact Form Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${
      message || "(No message provided)"
    }`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${
        message ? message.replace(/\n/g, "<br>") : "(No message provided)"
      }</p>
    `,
  };

  // Send Email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
  }
};

module.exports = {
  handleContactForm,
};
