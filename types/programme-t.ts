export type IId = string | undefined

export interface IFaculty {
  id: IId
  title: string
}

export interface IProgramme {
  id: IId
  title: string
  studyFormId: IId
  facultyId: IId
  subjects: ISubject[]
}

export interface ISubject {
  id: IId
  title: string
  programmes: IProgramme[]
}

export interface IProgrammeSubject {
  programmeId: IId
  subjectId: IId
}

export interface IStudyForm {
  id: IId
  title: string
}

export interface IOption {
  id: IId
  title: string
}
