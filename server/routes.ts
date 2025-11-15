import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCustomerLeadSchema } from "@shared/schema";
import XLSX from "xlsx";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const EXCEL_DIR = join(process.cwd(), "data");
const EXCEL_FILE = join(EXCEL_DIR, "leads.xlsx");

// Ensure data directory exists
if (!existsSync(EXCEL_DIR)) {
  mkdirSync(EXCEL_DIR, { recursive: true });
}

// Initialize Excel file with headers if it doesn't exist
function initializeExcelFile() {
  if (!existsSync(EXCEL_FILE)) {
    const wb = XLSX.utils.book_new();
    const headers = ["নাম", "ফোন", "সার্ভিস", "সফরের তারিখ", "পাসপোর্ট স্ট্যাটাস", "বার্তা", "Timestamp"];
    const ws = XLSX.utils.aoa_to_sheet([headers]);
    
    // Set column widths
    ws['!cols'] = [
      { wch: 20 }, // নাম
      { wch: 15 }, // ফোন
      { wch: 15 }, // সার্ভিস
      { wch: 15 }, // সফরের তারিখ
      { wch: 20 }, // পাসপোর্ট স্ট্যাটাস
      { wch: 40 }, // বার্তা
      { wch: 20 }, // Timestamp
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, "Customer Leads");
    XLSX.writeFile(wb, EXCEL_FILE);
  }
}

// Add lead to Excel file
function addLeadToExcel(lead: any) {
  initializeExcelFile();
  
  // Read the Excel file using fs.readFileSync and then parse it
  const fileBuffer = readFileSync(EXCEL_FILE);
  const wb = XLSX.read(fileBuffer, { type: 'buffer' });
  const ws = wb.Sheets["Customer Leads"];
  
  // Convert sheet to JSON to get existing data
  const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];
  
  // Add new row
  const newRow = [
    lead.name,
    lead.phone,
    lead.serviceType,
    lead.travelDate || "",
    lead.passportStatus || "",
    lead.message || "",
    new Date().toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" }),
  ];
  
  data.push(newRow);
  
  // Create new worksheet with updated data
  const newWs = XLSX.utils.aoa_to_sheet(data);
  
  // Set column widths
  newWs['!cols'] = [
    { wch: 20 }, // নাম
    { wch: 15 }, // ফোন
    { wch: 15 }, // সার্ভিস
    { wch: 15 }, // সফরের তারিখ
    { wch: 20 }, // পাসপোর্ট স্ট্যাটাস
    { wch: 40 }, // বার্তা
    { wch: 20 }, // Timestamp
  ];
  
  // Update workbook
  wb.Sheets["Customer Leads"] = newWs;
  
  // Write to file using fs.writeFileSync
  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  writeFileSync(EXCEL_FILE, buffer);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Excel file on server start
  initializeExcelFile();

  // Submit customer form
  app.post("/api/submit-form", async (req, res) => {
    try {
      const result = insertCustomerLeadSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid form data",
          errors: result.error.errors 
        });
      }

      // Save to storage
      const lead = await storage.createCustomerLead(result.data);
      
      // Save to Excel file
      addLeadToExcel(result.data);

      res.status(201).json({ 
        message: "Form submitted successfully",
        lead 
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
