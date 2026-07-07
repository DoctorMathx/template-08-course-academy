import type { Metadata } from "next";
import { CheckoutClient } from "./checkout-client";

export const metadata: Metadata = { title: "Enrol" };

export default function CheckoutPage() {
  return <CheckoutClient />;
}
