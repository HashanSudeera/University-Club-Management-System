import cron from "node-cron";
import fs from "fs";
import path from "path";
import Event from "../models/Event.js";
import EventRegister from "../models/EventRegister.js";

// Function to clean up expired tickets and orphaned files
export const cleanExpiredTickets = async () => {
  console.log("[CRON] Checking for expired event tickets...");
  try {
    const now = new Date();

    // 1. Find all events whose date has passed
    const expiredEvents = await Event.find({ date: { $lt: now } });

    for (const event of expiredEvents) {
      // Find all registrations for this expired event
      const registrations = await EventRegister.find({ event_id: event._id });

      for (const reg of registrations) {
        if (reg.ticket_path) {
          const fileName = path.basename(reg.ticket_path);
          const filePath = path.join(process.cwd(), "tickets", fileName);

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`[CRON] Deleted expired ticket file: ${fileName}`);
          }
        }
      }

      // Delete the registration documents from MongoDB
      const deleteResult = await EventRegister.deleteMany({ event_id: event._id });
      if (deleteResult.deletedCount > 0) {
        console.log(`[CRON] Removed ${deleteResult.deletedCount} registrations for event: "${event.title}"`);
      }
    }

    // 2. Clean up any ORPHANED ticket files in the server/tickets folder
    // (files left on disk where the registration in MongoDB no longer exists)
    const ticketsDir = path.join(process.cwd(), "tickets");
    if (fs.existsSync(ticketsDir)) {
      const filesOnDisk = fs.readdirSync(ticketsDir);

      for (const file of filesOnDisk) {
        if (file.endsWith(".png")) {
          // Check if there is an active registration using this ticket
          const activeReg = await EventRegister.findOne({ 
            ticket_path: `/tickets/${file}` 
          });

          // If no registration exists in MongoDB, delete the leftover file!
          if (!activeReg) {
            const filePath = path.join(ticketsDir, file);
            fs.unlinkSync(filePath);
            console.log(`[CRON] Deleted orphaned ticket file: ${file}`);
          }
        }
      }
    }

    console.log("[CRON] Cleanup check completed.");
  } catch (error) {
    console.error("[CRON Error] Failed to clean up expired tickets:", error.message);
  }
};

// Start the cron scheduler
export const startTicketCleanup = () => {
  // Runs every day at midnight ('0 0 * * *')
  cron.schedule("0 0 * * *", () => {
    cleanExpiredTickets();
  });

  // Run immediately when server starts
  cleanExpiredTickets();

  console.log("[CRON] Ticket cleanup job started (runs daily at midnight).");
};