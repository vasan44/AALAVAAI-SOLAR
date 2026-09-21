import { NextRequest, NextResponse } from "next/server";
import { createLead, listLeads, updateLeadStatus, deleteLead, type LeadStatus } from "@/lib/db";
import { leadStatuses } from "@/lib/site-data";

function isAuthorized(request: NextRequest) {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredPassword) return false;
  const header = request.headers.get("authorization");
  return header === `Bearer ${configuredPassword}`;
}

function cleanText(value: unknown, maxLength: number) {
  return String(value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = cleanText(body.name, 80);
    const phone = cleanText(body.phone, 20);
    const area = cleanText(body.area, 100);
    const propertyType = cleanText(body.propertyType, 40);
    const monthlyBill = cleanText(body.monthlyBill, 40);
    const message = cleanText(body.message, 500);

    if (!name || !phone || !area || !propertyType) {
      return NextResponse.json({ error: "Name, phone, area and property type are required." }, { status: 400 });
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) {
      return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });
    }

    const lead = await createLead({ name, phone, area, propertyType, monthlyBill, message });
    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error && error.message.includes("DATABASE_URL")
      ? "Database is not configured. Set DATABASE_URL and run db/schema.sql."
      : "Unable to save lead.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await listLeads();
    return NextResponse.json({ leads });
  } catch {
    return NextResponse.json({ error: "Unable to fetch leads." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const id = Number(body.id);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Valid lead id required." }, { status: 400 });
  }
  try {
    await deleteLead(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to delete lead." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const id = Number(body.id);
  const status = String(body.status) as LeadStatus;
  if (!Number.isInteger(id) || !leadStatuses.includes(status)) {
    return NextResponse.json({ error: "Valid lead id and status are required." }, { status: 400 });
  }
  try {
    const lead = await updateLeadStatus(id, status);
    if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    return NextResponse.json({ lead });
  } catch {
    return NextResponse.json({ error: "Unable to update lead." }, { status: 500 });
  }
}
