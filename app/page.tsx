import { HomeContent } from "@/components/home/home-content"
import { getCurrentRole } from "@/utils/server-auth"

export default async function Home() {
  const role = await getCurrentRole()

  return <HomeContent role={role} />
}
