import { ClientProfile } from "@/components/clients/client-profile";
import { getClients } from "@/services/client-service";

export default async function ClientDetailsPage() {
  return <ClientProfile clients={await getClients()} />;
}
