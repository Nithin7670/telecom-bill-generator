import { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import fs from "fs";

// Initialize WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth(), // saves login session
});

// Generate QR Code
client.on("qr", (qr) => {
  console.log("Scan this QR in WhatsApp:");
  qrcode.generate(qr, { small: true });
});

// Ready event
client.on("ready", async () => {
  console.log("✅ WhatsApp is ready!");

  const phoneNumber = "916304671461"; // 👈 customer number with country code
  const chatId = phoneNumber + "@c.us";

  // Load PDF
  const media = MessageMedia.fromFilePath("D:\\KMEdTech\\JSbasics\\telecom-bill\\TelecomBill.pdf");

  // Send PDF
  await client.sendMessage(chatId, media, {
    caption: "📄 Your Telecom Bill",
  });

  console.log("✅ PDF sent on WhatsApp!");
});

client.initialize();