import { type CustomerLead, type InsertCustomerLead } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createCustomerLead(lead: InsertCustomerLead): Promise<CustomerLead>;
  getAllCustomerLeads(): Promise<CustomerLead[]>;
}

export class MemStorage implements IStorage {
  private customerLeads: Map<string, CustomerLead>;

  constructor() {
    this.customerLeads = new Map();
  }

  async createCustomerLead(insertLead: InsertCustomerLead): Promise<CustomerLead> {
    const id = randomUUID();
    const lead: CustomerLead = {
      ...insertLead,
      travelDate: insertLead.travelDate ?? null,
      passportStatus: insertLead.passportStatus ?? null,
      message: insertLead.message ?? null,
      id,
      createdAt: new Date(),
    };
    this.customerLeads.set(id, lead);
    return lead;
  }

  async getAllCustomerLeads(): Promise<CustomerLead[]> {
    return Array.from(this.customerLeads.values());
  }
}

export const storage = new MemStorage();
