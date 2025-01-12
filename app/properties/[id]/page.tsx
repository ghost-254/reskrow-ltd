import PropertyDetails from "@/components/property-details/property-details";
import { use } from "react";

export default function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return <PropertyDetails id={resolvedParams.id} />;
}
