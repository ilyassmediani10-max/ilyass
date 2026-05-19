import { getClients } from "../client-service";
import { ClientProfile } from "./client-profile";

export default async function ClientDetailsPage() {
  const clients = await getClients();

  return <ClientProfile clients={clients} />;
}
