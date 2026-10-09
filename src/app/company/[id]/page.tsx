import React from "react";
import CompanyContent from "./CompanyContent";

export default async function CompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CompanyContent companyId={id} />;
}
