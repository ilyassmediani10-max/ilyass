import { ISubject } from "@/types/subjects-t"
import { type NextRequest } from "next/server"

const subjectsDb: { [key: string]: ISubject[] } = {
  1: [
    { id: 1, title: "Math" },
    { id: 2, title: "English" },
  ],
  2: [
    { id: 3, title: "Object-Oriented Programming" },
    { id: 4, title: "Professional Language" },
  ],
  3: [
    { id: 5, title: "Networks" },
    { id: 6, title: "Databases" },
  ],
}

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const semesterId = searchParams.get("semesterId") ?? ""
  const subjects = subjectsDb[semesterId] || []
  return Response.json(subjects)
}
