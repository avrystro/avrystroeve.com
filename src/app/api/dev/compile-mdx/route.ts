import { NextResponse } from "next/server";
import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  const { content } = await request.json();

  try {
    const { content: body, data: frontmatter } = matter(content);

    const compiled = await compile(body, {
      outputFormat: "function-body",
      development: true,
    });

    return NextResponse.json({
      code: String(compiled),
      frontmatter,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Compilation failed";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
