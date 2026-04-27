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
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
// Initialize WhatsApp client
const client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth(), // saves login session
});
// Generate QR Code
client.on("qr", (qr) => {
    console.log("Scan this QR in WhatsApp:");
    qrcode_terminal_1.default.generate(qr, { small: true });
});
// Ready event
client.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("✅ WhatsApp is ready!");
    const phoneNumber = "916304671461"; // 👈 customer number with country code
    const chatId = phoneNumber + "@c.us";
    // Load PDF
    const media = whatsapp_web_js_1.MessageMedia.fromFilePath("D:\\KMEdTech\\JSbasics\\telecom-bill\\TelecomBill.pdf");
    // Send PDF
    yield client.sendMessage(chatId, media, {
        caption: "📄 Your Telecom Bill",
    });
    console.log("✅ PDF sent on WhatsApp!");
}));
client.initialize();
