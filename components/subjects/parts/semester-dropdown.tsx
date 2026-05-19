import { ISemester } from "@types/semester-t"
import { getApi } from "@utils/server-api"
import { useEffect, useState } from "react"

type IProps = { setSemesterId: (s: number) => void }

export function SemesterDropdown(props: IProps) {
  const { setSemesterId } = props
  const [semesters, setSemesters] = useState<ISemester[]>([])
  useEffect(() => {
    getApi<ISemester[]>(`/api/semesters`)
      .then((r) => setSemesters(r ?? []))
      .catch((e) => console.error(e))
  }, [])

  return (
    <div className="grid grid-flow-col gap-x-2 justify-start">
      <label htmlFor="semester" className="text-sm font-medium text-gray-900">
        Select Semester
      </label>
      <select
        onChange={(e) => setSemesterId(Number(e.target.value) || 0)}
        id="semester"
        className="w-28 bg-gray-50 col-span-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
      >
        <option>--</option>
        {semesters.map((semester) => (
          <option key={semester.id} value={semester.id}>
            {semester.name}
          </option>
        ))}
      </select>
    </div>
  )
}
