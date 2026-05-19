import { ISubject } from "@/types/subject-t"
import { getApi } from "@utils/server-api"
import { useEffect, useState } from "react"

type IProps = { semesterId: number }

export function SubjectList(props: IProps) {
  const { semesterId } = props
  const [subjects, setSubjects] = useState<ISubject[]>([])
  useEffect(() => {
    if (!semesterId) {
      setSubjects([])
      return
    }
    getApi<ISubject[]>(`/api/subjects?semesterId=${semesterId}`).then((r) =>
      setSubjects(r ?? []),
    )
  }, [semesterId])
  return (
    <ul className="font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
      {subjects.map((subject) => (
        <li
          key={subject.id}
          className="px-4 py-2 border-b border-gray-200 rounded-t-lg"
        >
          {subject.title}
        </li>
      ))}
    </ul>
  )
}
