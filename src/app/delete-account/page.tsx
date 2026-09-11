import type { Metadata } from "next";
import { DeleteAccountContent } from "@/components/legal/delete-account-content";

export const metadata: Metadata = {
  title: "Delete Account | Hirance",
};

export default function DeleteAccountPage() {
  return <DeleteAccountContent />;
}
