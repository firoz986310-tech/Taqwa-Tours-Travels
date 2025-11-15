import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Customer lead schema for form submissions
export const customerLeads = pgTable("customer_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  serviceType: text("service_type").notNull(),
  travelDate: text("travel_date"),
  passportStatus: text("passport_status"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCustomerLeadSchema = createInsertSchema(customerLeads).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1, "নাম প্রয়োজন"),
  phone: z.string().min(10, "সঠিক ফোন নম্বর দিন"),
  serviceType: z.string().min(1, "সার্ভিস নির্বাচন করুন"),
  travelDate: z.string().optional(),
  passportStatus: z.string().optional(),
  message: z.string().optional(),
});

export type InsertCustomerLead = z.infer<typeof insertCustomerLeadSchema>;
export type CustomerLead = typeof customerLeads.$inferSelect;
