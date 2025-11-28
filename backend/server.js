const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from project root (index.html and assets)
app.use(express.static(path.join(__dirname, "..")));

app.post("/send-email", (req, res) => {
  const data = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "srinivasshanmukha2@gmail.com",
      pass: "ique ettu iyut ljdd", // Gmail app password (see below)
    },
  });

  const mailOptions = {
    from: data.email,
    to: "ksquaremediahub@gmail.com", // your real inbox
    subject: "New Appointment Booking",
    text: `
      Full Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      Service: ${data.service}
      Date: ${data.date}
      Message: ${data.message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Could not send email.");
    } else {
      res.send("Email sent successfully!");
    }
  });
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
