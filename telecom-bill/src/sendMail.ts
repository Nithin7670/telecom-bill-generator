import nodemailer from "nodemailer";

async function sendMail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "babluffyt@gmail.com",       // 👉 your Gmail
      pass: "iogmlgggokjrboyh"         // 👉 Gmail App Password
    }
  });

  const mailOptions = {
    from: "babluffyt@gmail.com",
    to: "lavulurijoshitha@gmail.com",           // 👉 receiver email
    subject: "Your Telecom Bill",

    text: `
Dear Customer,

Greetings from Jio!

We hope you are doing well. Please find attached your latest Jio service bill invoice for your recent usage period. The invoice contains details of your plan, usage, and the total amount due.

We kindly request you to review the invoice and ensure that the payment is made before the due date to continue enjoying uninterrupted services.

If you have any questions or need assistance, feel free to reach out to our customer support team.

Thank you for choosing Jio.

Warm regards,
Jio Customer Support Team
    `,

    attachments: [
      {
        filename: "TelecomBill.pdf",
        path: "D:\\KMEdTech\\JSbasics\\telecom-bill\\TelecomBill.pdf"   // 👉 your generated PDF file
      }
    ]
  };

  await transporter.sendMail(mailOptions);
  console.log("✅ Email sent successfully!");
}

export default sendMail;