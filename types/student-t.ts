export interface IStudent {
  id: number
  name: string
}

export interface IGroup {
  id: number
  name: string
}

export interface IStudentDto {
  id: number
  firstName: string
  lastName: string
  groupId: IGroup["id"]
  birthday: string
}
