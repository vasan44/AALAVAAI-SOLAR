import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

function isAuthorized(request: NextRequest) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  return request.headers.get("authorization") === `Bearer ${pw}`;
}

const ALLOWED = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml"]);
const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const form = await request.formData();
  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
  }
  const ext = EXT[file.type] ?? "jpg";
  const filename = `${randomUUID()}.${ext}`;
  const dir = join(process.cwd(), "public", "gallery");
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(join(dir, filename), buffer);
  return NextResponse.json({ url: `/gallery/${filename}` }, { status: 201 });
}
