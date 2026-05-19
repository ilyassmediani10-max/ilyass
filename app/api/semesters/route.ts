import { ISemester } from "@/types/semester-t"
import { type NextRequest } from "next/server"

const semestersDb: ISemester[] = [
  { id: 1, name: "First" },
  { id: 2, name: "Second" },
  { id: 3, name: "Third" },
]

export function GET(request: NextRequest) {
  return Response.json(semestersDb)
}
