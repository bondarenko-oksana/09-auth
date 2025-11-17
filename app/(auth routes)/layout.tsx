"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type PublicProps = {
  children: React.ReactNode;
};
export default function PublicLayout({ children }: PublicProps) {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);
  return  children;
}
