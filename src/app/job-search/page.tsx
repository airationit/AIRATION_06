import { redirect } from "next/navigation";

interface JobSearchPageProps {
  searchParams?: Promise<{
    keyword?: string;
    search?: string;
    [key: string]: string | undefined;
  }>;
}

export default async function JobSearchPage({ searchParams }: JobSearchPageProps) {
  const resolved = searchParams ? await searchParams : {};
  const query = new URLSearchParams();

  Object.entries(resolved).forEach(([key, val]) => {
    if (val) query.set(key, val);
  });

  const queryString = query.toString();
  redirect(`/jobs${queryString ? `?${queryString}` : ""}`);
}
