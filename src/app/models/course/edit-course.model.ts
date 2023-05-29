export interface IEditCourseModel {
  id: number | string,
  name: string,
  description?: string,
  section?: string,
  image?: string,
  isOnlyForCodeAccess: boolean
}
