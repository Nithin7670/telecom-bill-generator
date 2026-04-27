import PDFDocument from "pdfkit";
import fs from "fs";
import moment from "moment";
import sendMail from "./sendMail";

import { generatePDF } from "./pdfGenerator";
import "./sendWhatsApp"; // 👈 just import to trigger WhatsApp

const run = async () => {
  await generatePDF("./TelecomBill.pdf");
};

run();
// Bill Data
const bill = {
  company: "Jio Telecom Pvt Ltd",
  customerName: "Bablu",
  mobileNumber: "8019326670",
  address: "Bangalore, India",
  billDate: moment().format("25-04-2026"),
  billNo: "1234567890",
  plan: "Unlimited 5G Plan",
  dataUsed: 28,
  callMinutes: 420,
  smsUsed: 150,
  amount: 599,
};

// Create PDF
const doc = new PDFDocument({ margin: 50 });

doc.pipe(fs.createWriteStream("TelecomBill.pdf"));

// HEADER
doc
  .fontSize(22)
  .fillColor("#ae0a0a")
  .text(bill.company, { align: "center" });

doc
  .fontSize(16)
  .fillColor("black")
  .text("Telecom Service Bill", { align: "center" });

doc.moveDown();

// LINE
doc.moveTo(50, 120).lineTo(550, 120).stroke();

doc.moveDown();

// CUSTOMER DETAILS
doc.fontSize(12).text(`Customer Name: ${bill.customerName}`);
doc.text(`Mobile Number: ${bill.mobileNumber}`);
doc.text(`Address: ${bill.address}`);
doc.text(`Bill Date: ${bill.billDate}`);
doc.text(`Bill no: ${bill.billNo || "1234567890"}`);

doc.moveDown();

// TABLE HEADER
doc
  .rect(50, 200, 500, 25)
  .fill("#a50b2a")
  .fillColor("white")
  .text("Description", 60, 207)
  .text("Usage", 300, 207)
  .text("Charges", 450, 207);

// TABLE ROWS
doc.fillColor("black");

let y = 240;

const tableData = [
  { desc: "Data Usage (GB)", usage: bill.dataUsed, charge: "Included" },
  { desc: "Call Minutes", usage: bill.callMinutes, charge: "Included" },
  { desc: "SMS Used", usage: bill.smsUsed, charge: "Included" },
  { desc: "Plan Charges", usage: "-", charge: `₹${bill.amount}` },
];

tableData.forEach((row) => {
  doc
    .rect(50, y, 500, 25)
    .stroke()
    .text(row.desc, 60, y + 7)
    .text(String(row.usage), 300, y + 7)
    .text(row.charge, 450, y + 7);

  y += 25;
});

// TOTAL BOX
doc
  .rect(300, y + 20, 250, 40)
  .fill("#EAF2F8")
  .fillColor("black")
  .fontSize(14)
  .text(`Total Amount: ${bill.amount}`, 320, y + 35);

// FOOTER
doc.moveDown(4);

doc
  .fontSize(10)
  .fillColor("black")
  .text("This is a system generated bill.", { align: "center" });

doc
  .text("Thank you for choosing Jio Telecom!", { align: "center" });

doc.end();

console.log("✅ Telecom Bill PDF Generated!");

// Send email with the generated PDF
sendMail();
