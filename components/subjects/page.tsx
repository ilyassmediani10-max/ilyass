import { SemesterSubjects } from "@/components/subjects/semester-subjects"

export default function SubjectPage() {
  return (
    <div className="grid grid-flow-row gap-4">
      <h1 className="font-bold text-xl">Subjects of semester</h1>
      <SemesterSubjects />
    </div>
  )
}
