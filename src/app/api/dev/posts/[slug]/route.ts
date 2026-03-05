import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const postsDir = path.join(process.cwd(), "src/content/posts");

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  const { slug } = await params;

  // Validate slug
  if (/[/\\]|\.\./.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const filePath = path.join(postsDir, `${slug}.mdx`);
  const { content } = await request.json();

  fs.writeFileSync(filePath, content, "utf8");
  const stats = fs.statSync(filePath);

  return NextResponse.json({
    ok: true,
    lastModified: stats.mtimeMs,
  });
}
