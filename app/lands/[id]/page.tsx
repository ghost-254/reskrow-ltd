import LandDetails from "@/components/land-details/land-details";
import { use } from "react";

export default function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return <LandDetails id={resolvedParams.id} />;
}
