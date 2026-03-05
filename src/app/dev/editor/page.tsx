import { redirect } from "next/navigation";
import { EditorClient } from "./editor-client";

export default function EditorPage() {
  if (process.env.NODE_ENV === "production") {
    redirect("/");
  }
  return <EditorClient />;
}
