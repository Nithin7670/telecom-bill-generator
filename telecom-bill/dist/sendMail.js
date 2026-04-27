"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendMail() {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "babluffyt@gmail.com", // 👉 your Gmail
                pass: "iogmlgggokjrboyh" // 👉 Gmail App Password
            }
        });
        const mailOptions = {
            from: "babluffyt@gmail.com",
            to: "lavulurijoshitha@gmail.com", // 👉 receiver email
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
                    path: "D:\\KMEdTech\\JSbasics\\telecom-bill\\TelecomBill.pdf" // 👉 your generated PDF file
                }
            ]
        };
        yield transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully!");
    });
}
exports.default = sendMail;
