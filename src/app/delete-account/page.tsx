import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { DeleteAccountContent } from "@/components/legal/delete-account-content";

export const metadata: Metadata = {
  ...pageMetadata("Delete Account | Hirance", "Learn how to delete your Hirance account and request removal of your data.", "/delete-account"),
  title: "Delete Account | Hirance",
};

export default function DeleteAccountPage() {
  return <DeleteAccountContent />;
}
