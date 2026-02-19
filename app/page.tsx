import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";

export const metadata: Metadata = {
  title: "Zaw Ye Htet (Simon) | Full-Stack Software Engineer Portfolio",
  description:
    "Portfolio of Zaw Ye Htet (zawyehtet) — Full-Stack Software Engineer based in Bangkok, Thailand. Expert in React, Next.js, Node.js, TypeScript, Supabase, and scalable SaaS architecture. Currently at FRONTIIR (Myanmar Net). Open to new opportunities.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <HomeContent />;
}
