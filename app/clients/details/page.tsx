import { ClientProfile } from "@/components/clients/client-profile";
import { getClients } from "@/services/client-service";

export const dynamic = "force-dynamic";

export default async function ClientDetailsPage() {
  return <ClientProfile clients={await getClients()} />;
}
