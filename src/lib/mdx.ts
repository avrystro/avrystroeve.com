import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  heroImage?: string;
  published?: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): PostMeta | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    slug,
    ...(data as PostFrontmatter),
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}
