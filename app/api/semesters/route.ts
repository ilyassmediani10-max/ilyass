const semesters = [
  { id: 1, title: "Semester 1" },
  { id: 2, title: "Semester 2" },
  { id: 3, title: "Semester 3" },
];

export function GET() {
  return Response.json(semesters);
}
