import QRCode from "qrcode";
import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import path from "path";

const generateTicket = async ({ eventReg_id, userName, eventTitle, eventDate, eventLocation }) => {

  // Create tickets folder 
  const ticketsDir = path.join(process.cwd(), "tickets");
  if (!fs.existsSync(ticketsDir)) {
    fs.mkdirSync(ticketsDir, { recursive: true });
  }

  // QR code data
  const qrData = JSON.stringify({
    regId: eventReg_id,
    name: userName,
    event: eventTitle,
  });

  // Generate QR code as buffer
  const qrImageBuffer = await QRCode.toBuffer(qrData, {
    width: 200,
    margin: 1,
  });

  // Create ticket size
  const width = 500;
  const height = 300;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  // Header bar
  ctx.fillStyle = "#1a237e";
  ctx.fillRect(0, 0, width, 50);

  // Header text
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 20px Arial";
  ctx.fillText("EVENT PASS", 170, 33);

  // Load and draw QR code
  const qrImage = await loadImage(qrImageBuffer);
  ctx.drawImage(qrImage, 30, 70, 180, 180);

  // Event details (right side)
  ctx.fillStyle = "#333333";

  ctx.font = "bold 18px Arial";
  ctx.fillText(eventTitle, 240, 95);

  ctx.font = "14px Arial";
  ctx.fillText(`Name: ${userName}`, 240, 130);
  ctx.fillText(`Reg ID: ${eventReg_id}`, 240, 155);
  ctx.fillText(`Date: ${new Date(eventDate).toLocaleDateString()}`, 240, 180);
  ctx.fillText(`Location: ${eventLocation}`, 240, 205);

  // Footer line
  ctx.fillStyle = "#1a237e";
  ctx.fillRect(0, 270, width, 30);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "12px Arial";
  ctx.fillText("Show this pass at the entrance", 155, 289);

  // Save to file
  const fileName = `ticket-${eventReg_id}.png`;
  const filePath = path.join(ticketsDir, fileName);
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(filePath, buffer);

  return `/tickets/${fileName}`;
};

export default generateTicket;