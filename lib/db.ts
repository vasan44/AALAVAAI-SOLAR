import { Pool } from "pg";

export type LeadStatus = "new" | "contacted" | "quoted" | "won" | "lost";

export type Lead = {
  id: number;
  name: string;
  phone: string;
  area: string;
  property_type: string;
  monthly_bill: string | null;
  message: string | null;
  status: LeadStatus;
  created_at: string;
};

export type LeadInput = {
  name: string;
  phone: string;
  area: string;
  propertyType: string;
  monthlyBill?: string;
  message?: string;
};

export type GalleryImage = {
  id: number;
  url: string;
  label: string;
  tag: string;
  created_at: string;
};

let pool: Pool | undefined;

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }
  pool ??= new Pool({ connectionString: process.env.DATABASE_URL });
  return pool;
}

export async function createLead(input: LeadInput) {
  const result = await getPool().query<Lead>(
    `INSERT INTO leads (name, phone, area, property_type, monthly_bill, message)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, name, phone, area, property_type, monthly_bill, message, status, created_at`,
    [input.name, input.phone, input.area, input.propertyType, input.monthlyBill || null, input.message || null],
  );
  return result.rows[0];
}

export async function listLeads() {
  const result = await getPool().query<Lead>(
    `SELECT id, name, phone, area, property_type, monthly_bill, message, status, created_at
     FROM leads ORDER BY created_at DESC LIMIT 200`,
  );
  return result.rows;
}

export async function updateLeadStatus(id: number, status: LeadStatus) {
  const result = await getPool().query<Lead>(
    `UPDATE leads SET status = $1 WHERE id = $2
     RETURNING id, name, phone, area, property_type, monthly_bill, message, status, created_at`,
    [status, id],
  );
  return result.rows[0] ?? null;
}

export async function deleteLead(id: number) {
  await getPool().query(`DELETE FROM leads WHERE id = $1`, [id]);
}

export async function listGalleryImages() {
  const result = await getPool().query<GalleryImage>(
    `SELECT id, url, label, tag, created_at FROM gallery_images ORDER BY created_at DESC`,
  );
  return result.rows;
}

export async function createGalleryImage(url: string, label: string, tag: string) {
  const result = await getPool().query<GalleryImage>(
    `INSERT INTO gallery_images (url, label, tag) VALUES ($1, $2, $3)
     RETURNING id, url, label, tag, created_at`,
    [url, label, tag],
  );
  return result.rows[0];
}

export async function deleteGalleryImage(id: number) {
  await getPool().query(`DELETE FROM gallery_images WHERE id = $1`, [id]);
}
