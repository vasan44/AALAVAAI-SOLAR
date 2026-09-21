import { NextRequest, NextResponse } from "next/server";
import { listGalleryImages, createGalleryImage, deleteGalleryImage } from "@/lib/db";

function isAuthorized(request: NextRequest) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  return request.headers.get("authorization") === `Bearer ${pw}`;
}

export async function GET() {
  try {
    const images = await listGalleryImages();
    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ error: "Unable to fetch gallery." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const url = String(body.url ?? "").trim().slice(0, 500);
  const label = String(body.label ?? "").trim().slice(0, 100);
  const tag = String(body.tag ?? "General").trim().slice(0, 50);
  if (!url || !label) {
    return NextResponse.json({ error: "URL and label are required." }, { status: 400 });
  }
  try {
    const image = await createGalleryImage(url, label, tag);
    return NextResponse.json({ image }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save image." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const id = Number(body.id);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Valid image id required." }, { status: 400 });
  }
  try {
    await deleteGalleryImage(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to delete image." }, { status: 500 });
  }
}
