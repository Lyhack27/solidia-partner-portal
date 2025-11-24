import PartnerPortalProject from "@/components/PartnerPortalProject";

// Solución al error de "implicitly has an 'any' type"
export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <PartnerPortalProject />;
}
